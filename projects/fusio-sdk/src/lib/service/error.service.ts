import { Injectable } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private event: EventService) { }

  public convert(error: any): Message {
    let message: Message;
    if (axios.isAxiosError(error) && error.response)  {
      message = {
        success: false,
        message: error.response.data.message || 'An unknown error occurred',
      };
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
