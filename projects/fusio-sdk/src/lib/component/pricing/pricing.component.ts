import {Component, OnInit} from '@angular/core';
import {ConsumerService} from "../../service/consumer.service";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {EventService} from "../../service/event.service";
import {LocationStrategy} from "@angular/common";
import {ErrorService} from "../../service/error.service";
import {ConfigService} from "../../service/config.service";
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {Product} from "../../config/config";

@Component({
  selector: 'fusio-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  isAuthenticated = true;
  paymentCurrency: string = 'EUR';
  description?: string;
  products?: Array<Product>;
  response?: Message;

  constructor(private consumer: ConsumerService, private event: EventService, private location: LocationStrategy, private error: ErrorService, private config: ConfigService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.consumer.hasValidToken();
    this.paymentCurrency = this.config.getPaymentCurrency();
    this.description = this.config.getPricingConfig()?.description;
    this.products = this.config.getPricingConfig()?.products;
  }

  async doBillingPortal() {
    try {
      const path = this.location.prepareExternalUrl(this.config.getHomePath());
      const redirectUrl = location.origin + path;

      const resource = await this.consumer.getClient().getConsumerPaymentByProviderPortal(this.config.getPaymentProvider());
      const response = await resource.consumerActionPaymentPortal({
        returnUrl: redirectUrl
      });

      if (response.data.redirectUrl) {
        location.href = response.data.redirectUrl;
      } else {
        throw new Error('You can only visit the billing portal once you have successfully purchased a subscription');
      }
    } catch (error) {
      this.response = this.error.convert(error)
    }
  }

  async doPurchase(planId: number) {
    try {
      const plan = await this.getPlanById(planId);

      const path = this.location.prepareExternalUrl('/account/subscription/callback/' + planId);
      const redirectUrl = location.origin + path;

      const resource = await this.consumer.getClient().getConsumerPaymentByProviderCheckout(this.config.getPaymentProvider());
      const response = await resource.consumerActionPaymentCheckout({
        planId: plan.id,
        returnUrl: redirectUrl,
      });

      if (response.data.approvalUrl) {
        this.event.dispatchCheckout(plan);

        location.href = response.data.approvalUrl;
      }
    } catch (error) {
      this.response = this.error.convert(error)
    }
  }

  private async getPlanById(planId: number): Promise<Plan> {
    const resource = await this.consumer.getClient().getConsumerPlanByPlanId('' + planId);
    const response = await resource.consumerActionPlanGet();
    return response.data;
  }

}
