import {Injectable} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {EventService} from "./event.service";
import {KnownStatusCodeException} from "sdkgen-client";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private event: EventService) { }

  public convert(error: any): Message {
    let message: Message;
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
