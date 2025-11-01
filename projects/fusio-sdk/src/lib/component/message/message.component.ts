import {Component, Input, OnInit, Signal, WritableSignal} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {WRITE_BUNDLES_TRANSFORM} from "ng-packagr/src/lib/ng-package/entry-point/write-bundles.di";

@Component({
  selector: 'fusio-message',
  templateUrl: './message.component.html',
  imports: [
    NgbAlert
  ],
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  response?: CommonMessage;

  ngOnInit(): void {
  }

}
