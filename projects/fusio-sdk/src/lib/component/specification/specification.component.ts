import {Component, OnInit, signal} from '@angular/core';
import {FusioService} from "../../service/fusio.service";
import {ImportService, Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../../service/error.service";
import {CommonMessage} from "fusio-sdk";
import {MessageComponent} from "../message/message.component";

@Component({
  selector: 'fusio-specification',
  templateUrl: './specification.component.html',
  imports: [
    TypeschemaEditorModule,
    MessageComponent
  ],
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

  spec = signal<Specification|undefined>(undefined);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: FusioService, private importService: ImportService, private httpClient: HttpClient, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    const link = await this.getTypeAPILink();
    if (!link) {
      return;
    }

    this.httpClient.get<Specification>(link).subscribe(async (spec) => {
      try {
        this.spec.set(await this.importService.transform('typeapi', JSON.stringify(spec)));
      } catch (error) {
        this.response.set(this.error.convert(error));
      }
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
