import {Component} from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {ConsumerLog} from "fusio-sdk/dist/ConsumerLog";

@Component({
  selector: 'fusio-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent extends Detail<ConsumerLog> {

}
