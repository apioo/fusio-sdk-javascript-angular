import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  name?: string

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.name = this.config.getHomeConfig()?.headline;
  }

}
