import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.css']
})
export class ImprintComponent implements OnInit {

  imprintUrl?: string;

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.imprintUrl = this.config.getImprintUrl();
  }

}
