import {Component} from '@angular/core';
import {ConsumerLog} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";

@Component({
  selector: 'fusio-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent extends Detail<ConsumerLog> {

}
