import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ConfigService} from "../../service/config.service";

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
