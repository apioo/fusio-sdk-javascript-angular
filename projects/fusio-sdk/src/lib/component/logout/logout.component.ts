import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'fusio-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService<User_Account>, private router: Router) {
  }

  ngOnInit(): void {
    this.user.logout();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

}
