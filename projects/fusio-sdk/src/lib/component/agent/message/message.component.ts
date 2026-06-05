import {Component, computed, OnInit, signal} from '@angular/core';
import {AgentInput, BackendAgentMessage, CommonMessage, ConsumerAgent} from "fusio-sdk";
import {AgentService} from "../../../service/agent.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {Input} from "../input/input";
import {Type} from "../type/type";
import {General} from "./general/general";
import {MessageComponent as ResponseComponent} from "../../message/message.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'fusio-agent-message',
  imports: [
    Input,
    Type,
    General,
    ResponseComponent,
    RouterLink,
    NgClass,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent implements OnInit {

  agent = signal<ConsumerAgent|undefined>(undefined);
  chats = signal<Array<BackendAgentMessage>>([]);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  chatId = signal<string|undefined>(undefined);
  selected = computed<BackendAgentMessage|undefined>((): BackendAgentMessage|undefined => {
    let result = undefined;
    this.chats().forEach((chat) => {
      if (chat.id === this.chatId()) {
        result = chat;
      }
    });
    return result;
  });

  constructor(private agentService: AgentService, private route: ActivatedRoute, private router: Router, protected error: ErrorService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        const agent = await this.agentService.get(params['id']);
        if (agent) {
          this.agent.set(agent);
          this.loadChats();
        }
      }
      if (params['chat_id']) {
        this.chatId.set(params['chat_id']);
      } else {
        this.chatId.set(undefined);
      }
    });
  }

  async loadChats() {
    const agentId = this.agent()?.id;
    if (!agentId) {
      return;
    }

    try {
      const collection = await this.agentService.getChats('' + agentId);

      this.loading.set(false);
      this.chats.set(collection.entry || []);
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  async loadChat(chat: BackendAgentMessage) {
    const agent = this.agent();
    if (!agent) {
      return;
    }

    await this.router.navigate(['/account/agent', agent.id, 'message', chat.chatId]);
  }

  async doSend(message: string) {
    const agentId = this.agent()?.id;
    if (!agentId) {
      return;
    }

    const payload: AgentInput = {
      previousId: this.chatId(),
      item: {
        type: "text",
        content: message
      }
    };

    this.loading.set(true);

    try {
      const output = await this.agentService.submit('' + agentId, payload);

      this.loading.set(false);

      await this.router.navigate(['/account/agent', agentId, 'message', output.id]);
    } catch (error) {
      this.response.set(this.error.convert(error));
      this.loading.set(false);
    }
  }

}
