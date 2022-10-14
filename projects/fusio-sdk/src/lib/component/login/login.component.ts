import {Component, Inject, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {Router} from "@angular/router";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ProviderService} from "../../service/provider.service";
import {UserService} from "../../service/user.service";
import {ConsumerService} from "../../service/consumer.service";
import {Config, FUSIO_CONFIG, Provider} from "../../config/config";

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

  constructor(private consumer: ConsumerService, private router: Router, private user: UserService<UserAccount>, private provider: ProviderService, @Inject(FUSIO_CONFIG) private config: Config) {
  }

  ngOnInit(): void {
    this.providers = this.provider.getProviders();
  }

  async login() {
    this.loading = true;

    try {
      const client = this.consumer.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const resource = await client.getConsumerAccount();
      const response = await resource.consumerActionUserGet();

      this.user.login(response.data);

      let homePath = '/account';
      if (this.config.homePath) {
        homePath = this.config.homePath;
      }

      this.router.navigate([homePath]).then(() => {
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
