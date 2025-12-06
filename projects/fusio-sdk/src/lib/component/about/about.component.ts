import {Component, resource} from '@angular/core';
import {SystemAbout} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";

@Component({
  selector: 'fusio-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  about = resource({
    loader: async (): Promise<SystemAbout> => {
      return await this.fusio.getClientAnonymous().system().meta().getAbout();
    },
  });

  constructor(private fusio: FusioService) { }

}
