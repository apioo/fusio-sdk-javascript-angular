import {Component, OnInit} from '@angular/core';
import {FusioService} from "../../service/fusio.service";
import {ImportService, Specification} from "ngx-typeschema-editor";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'fusio-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

  spec: Specification = {
    imports: [],
    operations: [],
    types: []
  };

  constructor(private fusio: FusioService, private importService: ImportService, private httpClient: HttpClient) { }

  async ngOnInit(): Promise<void> {
    const link = await this.getTypeAPILink();
    if (!link) {
      return;
    }

    this.httpClient.get<Specification>(link).subscribe(async (spec) => {
      this.spec = await this.importService.transform('typeapi', JSON.stringify(spec));
    });
  }

  private async getTypeAPILink(): Promise<string|undefined> {
    const about = await this.fusio.getClientAnonymous().system().meta().getAbout();

    let result = undefined;
    about.links?.forEach((link) => {
      if (link.rel === 'typeapi') {
        result = link.href;
      }
    });

    return result;
  }

}
