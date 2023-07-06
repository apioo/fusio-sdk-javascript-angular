import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Feature} from "../../config/config";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'fusio-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headline?: string;
  description?: string;
  backgroundImage?: string;
  features?: Array<Feature>;
  youtubeUrl?: SafeUrl;

  constructor(private config: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.headline = this.config.getHomeConfig()?.headline;
    this.description = this.config.getHomeConfig()?.description;
    this.backgroundImage = this.config.getHomeConfig()?.backgroundImage;
    this.features = this.config.getHomeConfig()?.features;

    const youtube = this.config.getHomeConfig()?.youtube;
    if (youtube) {
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + youtube);
    }
  }

}
