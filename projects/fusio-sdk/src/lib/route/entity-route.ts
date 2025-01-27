import {Routes} from "@angular/router";
import {isAuthenticated} from "../guard/authentication.guard";
import {Mode} from "../abstract/form";
import {Type} from "@angular/core";

export class EntityRoute {

  public static getAll(list: Type<any>, detail: Type<any>, form?: Type<any>): Routes {
    const routes: Routes = [
      {path: '', component: list, canActivate: [isAuthenticated]},
      {path: ':id', component: detail, canActivate: [isAuthenticated]},
    ];

    if (form) {
      routes.push({path: '-/new', component: form, data: {mode: Mode.Create}, canActivate: [isAuthenticated]});
      routes.push({path: ':id/edit', component: form, data: {mode: Mode.Update}, canActivate: [isAuthenticated]});
      routes.push({path: ':id/delete', component: form, data: {mode: Mode.Delete}, canActivate: [isAuthenticated]});
    }

    return routes;
  }

}
