import { Component, input, output, signal, OnDestroy } from '@angular/core';
import { FusioService } from "../../service/fusio.service";

@Component({
  selector: 'fusio-captcha',
  imports: [],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css',
})
export class Captcha implements OnDestroy {

  auto = input<boolean>(false);
  resolved = output<string>();

  status = signal<'idle' | 'loading' | 'solving' | 'verified' | 'error'>('idle');

  private worker: Worker | null = null;

  constructor(private fusio: FusioService) {}

  ngOnInit(): void {
    if (this.auto()) {
      this.solve();
    }
  }

  ngOnDestroy(): void {
    this.terminateWorker();
  }

  async solve(): Promise<void> {
    this.status.set('loading');

    try {
      const challenge = await this.fusio.getClientAnonymous().system().captcha().challenge();
      this.status.set('solving');

      if (challenge.salt && challenge.challenge && challenge.maxnumber) {
        const number = await this.findSolutionViaWorker(
          challenge.salt,
          challenge.challenge,
          challenge.maxnumber
        );

        if (number === null) {
          this.status.set('error');
          return;
        }

        const payloadData = {
          algorithm: challenge.algorithm,
          challenge: challenge.challenge,
          maxnumber: challenge.maxnumber,
          salt: challenge.salt,
          signature: challenge.signature,
          expires: challenge.expires,
          number: number
        };

        const payload = btoa(JSON.stringify(payloadData));
        this.status.set('verified');
        this.resolved.emit(payload);
      } else {
        this.status.set('error');
      }
    } catch (error) {
      this.status.set('error');
    }
  }

  private findSolutionViaWorker(salt: string, targetChallenge: string, maxNumber: number): Promise<number | null> {
    return new Promise((resolve) => {
      if (typeof Worker !== 'undefined') {
        const workerFunction = () => {
          addEventListener('message', async ({ data }) => {
            const { salt, targetChallenge, maxNumber } = data;
            const encoder = new TextEncoder();
            let solution: number | null = null;

            for (let i = 0; i <= maxNumber; i++) {
              const bytes = encoder.encode(salt + i);
              const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
              const hashArray = Array.from(new Uint8Array(hashBuffer));
              const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

              if (hashHex === targetChallenge) {
                solution = i;
                break;
              }
            }

            postMessage({ solution });
          });
        };

        // Convert the function to a Blob URL
        const code = `(${workerFunction.toString()})();`;
        const blob = new Blob([code], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);

        this.worker = new Worker(workerUrl);

        // Clean up the object URL once loaded
        URL.revokeObjectURL(workerUrl);

        this.worker.onmessage = ({ data }) => {
          this.terminateWorker();
          resolve(data.solution);
        };

        this.worker.onerror = () => {
          this.terminateWorker();
          resolve(null);
        };

        this.worker.postMessage({ salt, targetChallenge, maxNumber });
      } else {
        resolve(null);
      }
    });
  }

  private terminateWorker(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
