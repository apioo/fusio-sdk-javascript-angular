import {Component, Inject, Input, OnInit} from '@angular/core';
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ConsumerService} from "../../service/consumer.service";
import {LocationStrategy} from "@angular/common";
import {ErrorConverter} from "../../util/error-converter";
import {Config, FUSIO_CONFIG} from "../../config/config";

@Component({
  selector: 'fusio-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  currencyCode: string = 'EUR';
  plans?: Array<Plan>
  response?: Message;

  constructor(private consumer: ConsumerService, private location: LocationStrategy, @Inject(FUSIO_CONFIG) private config: Config) { }

  async ngOnInit(): Promise<void> {
    const plan = await this.consumer.getClient().getConsumerPlan();
    const response = await plan.consumerActionPlanGetAll({count: 1024});
    this.plans = response.data.entry;

    if (this.config.paymentCurrency) {
      this.currencyCode = this.config.paymentCurrency;
    }
  }

  async doBillingPortal() {
    try {
      const path = this.location.prepareExternalUrl(this.getHomePath());
      const redirectUrl = location.origin + path;

      const portal = await this.consumer.getClient().getConsumerPaymentByProviderPortal(this.getPaymentProvider());
      const response = await portal.consumerActionPaymentPortal({
        returnUrl: redirectUrl
      });

      if (response.data.redirectUrl) {
        location.href = response.data.redirectUrl;
      } else {
        throw new Error('You can only visit the billing portal once you have successfully purchased a subscription');
      }
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }
  }

  async doPurchase(plan: Plan) {
    try {
      const path = this.location.prepareExternalUrl(this.getHomePath());
      const redirectUrl = location.origin + path;

      const checkout = await this.consumer.getClient().getConsumerPaymentByProviderCheckout(this.getPaymentProvider());
      const response = await checkout.consumerActionPaymentCheckout({
        planId: plan.id,
        returnUrl: redirectUrl,
      });

      if (response.data.approvalUrl) {
        location.href = response.data.approvalUrl;
      }
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }
  }

  private getHomePath(): string {
    if (this.config.homePath) {
      return this.config.homePath;
    } else {
      return '/account';
    }
  }

  private getPaymentProvider(): string {
    if (this.config.paymentProvider) {
      return this.config.paymentProvider;
    } else {
      return 'stripe';
    }
  }

}
