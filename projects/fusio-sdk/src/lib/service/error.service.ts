import {Injectable} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {KnownStatusCodeException} from "sdkgen-client";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

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

    return message;
  }

}
