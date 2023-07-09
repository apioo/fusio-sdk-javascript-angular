import {Routes} from "@angular/router";
import {HomeComponent} from "../component/home/home.component";
import {FaqComponent} from "../component/faq/faq.component";
import {PricingComponent} from "../component/pricing/pricing.component";
import {ImprintComponent} from "../component/imprint/imprint.component";
import {AuthorizationRoute} from "ngx-fusio-sdk";

export class ProductRoute {

  public static getAll(): Routes {
    const routes = [
      {path: '', component: HomeComponent},
      {path: 'faq', component: FaqComponent, title: 'FAQ'},
      {path: 'pricing', component: PricingComponent, title: 'Pricing'},
      {path: 'imprint', component: ImprintComponent, title: 'Imprint'},
    ];

    routes.push(...AuthorizationRoute.getAll());

    return routes;
  }

}
