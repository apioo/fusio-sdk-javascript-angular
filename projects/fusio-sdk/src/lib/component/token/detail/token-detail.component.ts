import {Component} from '@angular/core';
import {ConsumerToken} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";

@Component({
  selector: 'fusio-token-detail',
  templateUrl: './token-detail.component.html',
  styleUrls: ['./token-detail.component.css']
})
export class TokenDetailComponent extends Detail<ConsumerToken> {

}
