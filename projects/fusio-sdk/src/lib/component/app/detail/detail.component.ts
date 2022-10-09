import {Component} from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";

@Component({
  selector: 'fusio-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<App> {

  hideSecret = true;

}
