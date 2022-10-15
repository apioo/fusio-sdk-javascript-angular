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
    const plan = await this.consumer.getClient().getConsumerPlan();
    const response = await plan.consumerActionPlanGetAll({count: 1024});
    this.plans = response.data.entry;
    this.currencyCode = this.config.getPaymentCurrency();
  }

  async doBillingPortal() {
    try {
      const path = this.location.prepareExternalUrl(this.config.getHomePath());
      const redirectUrl = location.origin + path;

      const portal = await this.consumer.getClient().getConsumerPaymentByProviderPortal(this.config.getPaymentProvider());
      const response = await portal.consumerActionPaymentPortal({
        returnUrl: redirectUrl
      });

      if (response.data.redirectUrl) {
        location.href = response.data.redirectUrl;
      } else {
        throw new Error('You can only visit the billing portal once you have successfully purchased a subscription');
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doPurchase(plan: Plan) {
    try {
      const path = this.location.prepareExternalUrl(this.config.getHomePath());
      const redirectUrl = location.origin + path;

      const checkout = await this.consumer.getClient().getConsumerPaymentByProviderCheckout(this.config.getPaymentProvider());
      const response = await checkout.consumerActionPaymentCheckout({
        planId: plan.id,
        returnUrl: redirectUrl,
      });

      if (response.data.approvalUrl) {
        this.event.dispatchPurchase(plan);

        location.href = response.data.approvalUrl;
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
