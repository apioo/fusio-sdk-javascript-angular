import {Component, Input, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'fusio-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  response?: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
