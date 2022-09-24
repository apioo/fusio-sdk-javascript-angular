import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'fusio-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService<UserAccount>, private router: Router) {
  }

  ngOnInit(): void {
    this.user.logout();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

}
