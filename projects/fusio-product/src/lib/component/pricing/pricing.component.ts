import {Component, OnInit} from '@angular/core';
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {ConsumerService, EventService, ErrorService, ConfigService} from "ngx-fusio-sdk";
import {LocationStrategy} from "@angular/common";
import {Product} from "../../config/config";
import {ConfigService as ProductConfigService} from "../../service/config.service";

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

  constructor(private consumer: ConsumerService, private event: EventService, private location: LocationStrategy, private error: ErrorService, private config: ConfigService, private productConfig: ProductConfigService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.consumer.hasValidToken();
    this.paymentCurrency = this.config.getPaymentCurrency();
    this.description = this.productConfig.getPricingConfig()?.description;
    this.products = this.productConfig.getPricingConfig()?.products;
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
      this.response = this.error.convert(error)
    }
  }

  async doPurchase(planId: number) {
    try {
      const plan = await this.getPlanById(planId);

      const path = this.location.prepareExternalUrl('/account/subscription/callback/' + planId);
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
      this.response = this.error.convert(error)
    }
  }

  private async getPlanById(planId: number): Promise<Plan> {
    return this.consumer.getClient().plan().get('' + planId);
  }

}
