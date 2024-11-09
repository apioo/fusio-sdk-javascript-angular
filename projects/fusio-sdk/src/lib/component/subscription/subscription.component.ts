import {Component, OnInit} from '@angular/core';
import {CommonMessage, ConsumerPlan} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {LocationStrategy} from "@angular/common";
import {EventService} from "../../service/event.service";
import {ConfigService} from "../../service/config.service";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'fusio-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  currencyCode: string = 'EUR';
  plans?: Array<ConsumerPlan>
  response?: CommonMessage;

  constructor(private fusio: FusioService, private location: LocationStrategy, private event: EventService, private error: ErrorService, private config: ConfigService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().plan().getAll(0, 1024);
    this.plans = response.entry;
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
      this.response = this.error.convert(error);
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
        this.event.dispatchCheckout(plan);

        location.href = response.approvalUrl;
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
