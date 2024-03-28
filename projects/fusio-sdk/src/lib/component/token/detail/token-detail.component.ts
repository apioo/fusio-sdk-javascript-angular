import { Component, OnInit } from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {ConsumerToken} from "fusio-sdk/dist/ConsumerToken";

@Component({
  selector: 'fusio-token-detail',
  templateUrl: './token-detail.component.html',
  styleUrls: ['./token-detail.component.css']
})
export class TokenDetailComponent extends Detail<ConsumerToken> {

}
