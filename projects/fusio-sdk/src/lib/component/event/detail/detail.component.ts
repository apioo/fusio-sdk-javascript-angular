import { Component, OnInit } from '@angular/core';
import {EventSubscription} from "fusio-sdk/dist/src/generated/consumer/EventSubscription";
import {Detail} from "../../../abstract/detail";

@Component({
  selector: 'fusio-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<EventSubscription> {

}
