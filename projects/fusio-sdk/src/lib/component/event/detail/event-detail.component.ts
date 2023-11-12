import { Component, OnInit } from '@angular/core';
import {ConsumerEventSubscription} from "fusio-sdk/dist/src/ConsumerEventSubscription";
import {Detail} from "../../../abstract/detail";

@Component({
  selector: 'fusio-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent extends Detail<ConsumerEventSubscription> {

}
