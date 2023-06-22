import { Injectable } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {EventService} from "./event.service";
import {MessageException as BackendException} from "fusio-sdk/dist/src/generated/backend/MessageException";
import {MessageException as ConsumerException} from "fusio-sdk/dist/src/generated/consumer/MessageException";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private event: EventService) { }

  public convert(error: any): Message {
    let message: Message;
    if (error instanceof BackendException || error instanceof ConsumerException) {
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
