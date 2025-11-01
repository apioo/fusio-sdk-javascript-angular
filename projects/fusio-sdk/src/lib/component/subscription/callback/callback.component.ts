import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CommonMessage, ConsumerPlan} from "fusio-sdk";
import {FusioService} from "../../../service/fusio.service";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";
import {ConfigService} from "../../../service/config.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {MessageComponent} from "../../message/message.component";

@Component({
  selector: 'fusio-subscription-callback',
  templateUrl: './callback.component.html',
  imports: [
    NgbAlert,
    RouterLink,
    MessageComponent
  ],
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  homePath?: string;
  plan = signal<ConsumerPlan|undefined>(undefined);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: FusioService, private error: ErrorService, private config: ConfigService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.homePath = this.config.getHomePath();

    this.route.paramMap.subscribe(async params => {
      const id = params.get('plan_id');
      if (id) {
        await this.loadPlan(id);
      }
    });
  }

  async loadPlan(id: string) {
    try {
      this.plan.set(await this.fusio.getClient().consumer().plan().get(id));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
