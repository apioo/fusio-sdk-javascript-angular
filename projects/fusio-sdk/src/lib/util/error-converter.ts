import axios from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

export class ErrorConverter {

  public static convert(error: any): Message {
    if (axios.isAxiosError(error) && error.response)  {
      return {
        success: false,
        message: error.response.data.message || 'An unknown error occurred',
      };
    } else {
      return {
        success: false,
        message: String(error),
      };
    }
  }

}
