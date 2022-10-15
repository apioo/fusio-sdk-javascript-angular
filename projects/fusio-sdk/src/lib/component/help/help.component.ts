import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  path?: string;
  url?: SafeUrl;

  constructor(public modal: NgbActiveModal, private config: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.path) {
      const baseUrl = this.config.getHelpUrl();
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl + this.path);
    }
  }

}
