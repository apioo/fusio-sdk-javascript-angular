import {Injectable} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {KnownStatusCodeException} from "sdkgen-client";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private event: EventService) { }

  public convert(error: any): CommonMessage {
    let message: CommonMessage;
    if (error instanceof KnownStatusCodeException) {
      message = error.getPayload();
    } else {
      message = {
        success: false,
        message: String(error),
      };
    }

    this.event.dispatchError(message);

    return message;
  }

}
