import {Component, OnInit, signal} from '@angular/core';
import {SystemAbout} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";

@Component({
  selector: 'fusio-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about = signal<SystemAbout|undefined>(undefined);

  constructor(private fusio: FusioService) { }

  async ngOnInit(): Promise<void> {
    this.about.set(await this.fusio.getClientAnonymous().system().meta().getAbout());
  }

}
