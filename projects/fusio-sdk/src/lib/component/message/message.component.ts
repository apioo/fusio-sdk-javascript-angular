import {Component, input} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-message',
  templateUrl: './message.component.html',
  imports: [
    NgbAlert
  ],
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  response = input<CommonMessage|undefined>(undefined);

}
