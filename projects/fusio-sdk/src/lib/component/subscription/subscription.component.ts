import {Component, OnInit} from '@angular/core';
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ConsumerService} from "../../service/consumer.service";
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
  plans?: Array<Plan>
  response?: Message;

  constructor(private consumer: ConsumerService, private location: LocationStrategy, private event: EventService, private error: ErrorService, private config: ConfigService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.consumer.getClient().plan().getAll(0, 1024);
    this.plans = response.entry;
    this.currencyCode = this.config.getPaymentCurrency();
  }

  async doBillingPortal() {
    try {
      const path = this.location.prepareExternalUrl(this.config.getHomePath());
      const redirectUrl = location.origin + path;

      const response = await this.consumer.getClient().payment().portal(this.config.getPaymentProvider(), {
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

  async doPurchase(plan: Plan) {
    try {
      const path = this.location.prepareExternalUrl('/account/subscription/callback/' + plan.id);
      const redirectUrl = location.origin + path;

      const response = await this.consumer.getClient().payment().checkout(this.config.getPaymentProvider(), {
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
