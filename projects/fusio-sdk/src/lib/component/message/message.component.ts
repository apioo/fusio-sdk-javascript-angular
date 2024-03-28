import {Component, Input, OnInit} from '@angular/core';
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'fusio-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  response?: CommonMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
