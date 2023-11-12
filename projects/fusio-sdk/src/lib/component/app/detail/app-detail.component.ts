import {Component} from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {ConsumerApp} from "fusio-sdk/dist/src/ConsumerApp";

@Component({
  selector: 'fusio-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent extends Detail<ConsumerApp> {

  hideSecret = true;

}
