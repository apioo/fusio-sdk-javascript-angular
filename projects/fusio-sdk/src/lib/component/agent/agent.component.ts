import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonMessage, ConsumerAgent} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {ErrorService} from "../../service/error.service";
import {MessageComponent} from "../message/message.component";
import {MarkdownComponent} from "ngx-markdown";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'fusio-agent',
  templateUrl: './agent.component.html',
  imports: [
    MessageComponent,
    MarkdownComponent,
    RouterLink,
  ],
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

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
