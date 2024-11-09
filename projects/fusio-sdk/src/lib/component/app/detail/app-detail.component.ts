import {Component} from '@angular/core';
import {ConsumerApp} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";

@Component({
  selector: 'fusio-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent extends Detail<ConsumerApp> {

  hideSecret = true;

}
