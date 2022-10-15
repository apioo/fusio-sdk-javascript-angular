import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {Router} from "@angular/router";
import {ProviderService} from "../../service/provider.service";
import {UserService} from "../../service/user.service";
import {ConsumerService} from "../../service/consumer.service";
import {Provider} from "../../config/config";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    username: '',
    password: ''
  }

  response?: Message;
  loading = false;

  providers: Array<Provider> = [];

  constructor(private consumer: ConsumerService, private router: Router, private user: UserService, private provider: ProviderService, private config: ConfigService) {
  }

  ngOnInit(): void {
    this.providers = this.config.getProviders();
  }

  async login() {
    this.loading = true;

    try {
      const client = this.consumer.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const resource = await client.getConsumerAccount();
      const response = await resource.consumerActionUserGet();

      this.user.login(response.data);

      this.router.navigate([this.config.getHomePath()]).then(() => {
        location.reload();
      });
    } catch (error) {
      this.loading = false;
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.error_description || 'An unknown error occurred',
        };
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

  doProviderLogin(name: string) {
    try {
      location.href = this.provider.generateUrl(name);
    } catch (error) {
      this.response = {
        success: false,
        message: String(error),
      };
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
