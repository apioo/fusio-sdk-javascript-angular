import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'fusio-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.css']
})
export class ImprintComponent implements OnInit {

  url?: SafeUrl;

  constructor(private config: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const imprintUrl = this.config.getImprintUrl();
    if (imprintUrl) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(imprintUrl);
    }
  }

}
