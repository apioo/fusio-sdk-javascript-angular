import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonMessage, ConsumerAgent} from "fusio-sdk";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {MessageComponent} from "../../message/message.component";
import {MarkdownComponent} from "ngx-markdown";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'fusio-agent-list',
  templateUrl: './list.html',
  imports: [
    MessageComponent,
    MarkdownComponent,
    RouterLink,

  ],
  styleUrls: ['./list.css']
})
export class List implements OnInit {

  agents = signal<Array<ConsumerAgent>>([]);
  response = signal<CommonMessage|undefined>(undefined);

  private fusio = inject(FusioService);
  private error = inject(ErrorService);

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().consumer().agent().getAll(0, 1024);
      this.agents.set(response.entry || []);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
