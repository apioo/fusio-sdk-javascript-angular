import {Component, OnInit, signal} from '@angular/core';
import {CommonMessage, ConsumerPlan} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {CurrencyPipe, LocationStrategy} from "@angular/common";
import {ConfigService} from "../../service/config.service";
import {ErrorService} from "../../service/error.service";
import {MessageComponent} from "../message/message.component";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'fusio-subscription',
  templateUrl: './subscription.component.html',
  imports: [
    MessageComponent,
    CurrencyPipe,
    MarkdownComponent,
  ],
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  currencyCode: string = 'EUR';
  plans = signal<Array<ConsumerPlan>>([]);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: FusioService, private location: LocationStrategy, private error: ErrorService, private config: ConfigService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().plan().getAll(0, 1024);
    this.plans.set(response.entry || []);
    this.currencyCode = this.config.getPaymentCurrency();
  }

  async doBillingPortal() {
    try {
      const path = this.location.prepareExternalUrl(this.config.getHomePath());
      const redirectUrl = location.origin + path;

      const response = await this.fusio.getClient().consumer().payment().portal(this.config.getPaymentProvider(), {
        returnUrl: redirectUrl
      });

      if (response.redirectUrl) {
        location.href = response.redirectUrl;
      } else {
        throw new Error('You can only visit the billing portal once you have successfully purchased a subscription');
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doPurchase(plan: ConsumerPlan) {
    try {
      const path = this.location.prepareExternalUrl('/account/subscription/callback/' + plan.id);
      const redirectUrl = location.origin + path;

      const response = await this.fusio.getClient().consumer().payment().checkout(this.config.getPaymentProvider(), {
        planId: plan.id,
        returnUrl: redirectUrl,
      });

      if (response.approvalUrl) {
        location.href = response.approvalUrl;
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
