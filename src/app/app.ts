import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BackendUser} from "fusio-sdk";
import {UserService} from "../../projects/fusio-sdk/src/lib/service/user.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  user?: BackendUser;

  constructor(private userMeta: UserService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();
  }

}

declare global {
  var FUSIO_URL: string | undefined;
}
