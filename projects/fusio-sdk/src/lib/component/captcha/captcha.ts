import {Component, input, output, signal} from '@angular/core';
import {FusioService} from "../../service/fusio.service";

@Component({
  selector: 'fusio-captcha',
  imports: [],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css',
})
export class Captcha {

  auto = input<boolean>(true);
  resolved = output<string>();

  status = signal<'idle' | 'loading' | 'solving' | 'verified' | 'error'>('idle');

  constructor(private fusio: FusioService) {
  }

  ngOnInit(): void {
    if (this.auto()) {
      this.solve();
    }
  }

  async solve(): Promise<void> {
    this.status.set('loading');

    try {
      const challenge = await this.fusio.getClientAnonymous().system().captcha().challenge();
      this.status.set('solving');
      try {
        if (challenge.salt && challenge.challenge && challenge.maxnumber) {
          const number = await this.findSolution(challenge.salt, challenge.challenge, challenge.maxnumber);
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
      } catch {
        this.status.set('error');
      }
    } catch (error) {
      this.status.set('error');
    }
  }

  private async findSolution(salt: string, targetChallenge: string, maxNumber: number): Promise<number | null> {
    const encoder = new TextEncoder();

    for (let i = 0; i <= maxNumber; i++) {
      const data = encoder.encode(salt + i);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === targetChallenge) {
        return i;
      }
    }

    return null;
  }

}
