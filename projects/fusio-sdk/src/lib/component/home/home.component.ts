import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Feature} from "../../config/config";

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
  youtube?: string;

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.headline = this.config.getHomeConfig()?.headline;
    this.description = this.config.getHomeConfig()?.description;
    this.backgroundImage = this.config.getHomeConfig()?.backgroundImage;
    this.features = this.config.getHomeConfig()?.features;
    this.youtube = this.config.getHomeConfig()?.youtube;
  }

}
