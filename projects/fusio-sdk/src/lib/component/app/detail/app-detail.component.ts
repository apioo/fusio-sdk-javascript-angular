import {Component} from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";

@Component({
  selector: 'fusio-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent extends Detail<App> {

  hideSecret = true;

}
