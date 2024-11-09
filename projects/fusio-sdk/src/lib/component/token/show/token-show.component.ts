import {Component, Input} from '@angular/core';
import {ConsumerTokenAccessToken} from "fusio-sdk";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-token-show',
  templateUrl: './token-show.component.html',
  styleUrls: ['./token-show.component.css']
})
export class TokenShowComponent {

  @Input() token!: ConsumerTokenAccessToken;

  constructor(public modal: NgbActiveModal) {
  }

  get expires(): Date {
    const expiresIn = this.token.expires_in;
    if (!expiresIn) {
      return new Date();
    }

    return new Date(Date.now() + (expiresIn * 1000));
  }

}
