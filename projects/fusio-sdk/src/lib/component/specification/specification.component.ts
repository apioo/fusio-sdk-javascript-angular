import {Component, OnInit} from '@angular/core';
import {FusioService} from "../../service/fusio.service";

@Component({
  selector: 'fusio-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

  constructor(private fusio: FusioService) { }

  async ngOnInit(): Promise<void> {
    this.loadRedoc(await this.getOpenAPILink());
  }

  private async getOpenAPILink(): Promise<string|undefined> {
    const about = await this.fusio.getClientAnonymous().system().meta().getAbout();

    let result = undefined;
    about.links?.forEach((link) => {
      if (link.rel === 'openapi') {
        result = link.href;
      }
    });

    return result;
  }

  private loadRedoc(url: string|undefined): void {
    if (!url) {
      throw new Error('Found no open api url');
    }

    const el = document.getElementById('redoc-script');
    if (el === null) {
      let node = document.createElement('script');
      node.src = 'https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js';
      node.type = 'text/javascript';
      node.async = true;
      node.id = 'redoc-script';
      node.onload = function() {
        SpecificationComponent.initRedoc(url);
      };
      document.getElementsByTagName('head')[0].appendChild(node);
    } else {
      SpecificationComponent.initRedoc(url);
    }
  }

  public static initRedoc(url: string) {
    const options = {
      scrollYOffset: 60,
      hideDownloadButton: true
    };

    Redoc.init(url, options, document.getElementById('redoc'))
  }

}

declare var Redoc: any;
