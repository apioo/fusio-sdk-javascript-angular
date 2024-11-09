import {Component, OnInit} from '@angular/core';
import {SystemAbout} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";

@Component({
  selector: 'fusio-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about?: SystemAbout;

  constructor(private fusio: FusioService) { }

  async ngOnInit(): Promise<void> {
    this.about = await this.fusio.getClientAnonymous().system().meta().getAbout();
  }

}
