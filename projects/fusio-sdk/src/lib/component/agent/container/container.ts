import {Component, computed, inject, input, OnInit, output, signal} from '@angular/core';
import {AgentInput, CommonMessage, ConsumerAgent, ConsumerAgentMessage} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {NgClass, NgComponentOutlet} from "@angular/common";
import {Connection} from "../../../abstract/agent/connection";
import {FUSIO_AGENT_CHAT_REGISTRY} from "../../../service/agent/agent-chat-registry";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {MessageComponent} from "../../message/message.component";

@Component({
  selector: 'fusio-agent-container',
  imports: [
    NgClass,
    NgbAlert,
    MessageComponent,
    NgComponentOutlet,
  ],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container implements OnInit {

  connection = input.required<Connection>();
  basePath = input.required<Array<string>>();

  agent = signal<ConsumerAgent|undefined>(undefined);
  chats = signal<Array<ConsumerAgentMessage>>([]);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  refId = signal<number>(0);
  chatId = signal<string|undefined>(undefined);

  agentLoad = output<ConsumerAgent>();

  selected = computed<ConsumerAgentMessage|undefined>((): ConsumerAgentMessage|undefined => {
    let result = undefined;
    this.chats().forEach((chat) => {
      if (chat.id === this.chatId()) {
        result = chat;
      }
    });
    return result;
  });

  queryParams = computed<Record<string, any>>(() => {
    const queryParams: Record<string, any> = {};
    const refId = this.refId();
    if (refId > 0) {
      queryParams['ref_id'] = refId;
    }

    return queryParams;
  });

  selectedMessageComponent = computed(() => {
    const type = this.agent()?.type;
    if (type === undefined || !this.registry) {
      return null;
    }

    return this.registry.get(type)?.type;
  });

  componentInputs = computed(() => {
    return {
      connection: this.connection(),
      agent: this.agent(),
      refId: this.refId(),
      chatId: this.chatId(),
    };
  });

  private registry = inject(FUSIO_AGENT_CHAT_REGISTRY);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private error = inject(ErrorService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (params['ref_id']) {
        this.refId.set(parseInt(params['ref_id']));
      } else {
        this.refId.set(0);
      }
    });

    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        const agent = await this.connection().get(params['id']);
        if (agent) {
          this.agent.set(agent);
          this.agentLoad.emit(agent);
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
      const collection = await this.connection().getChats('' + agentId, this.refId());

      this.loading.set(false);
      this.chats.set(collection.entry || []);
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  async loadChat(chat: ConsumerAgentMessage) {
    const agent = this.agent();
    if (!agent) {
      return;
    }

    await this.router.navigate([...this.basePath(), agent.id, 'chat', chat.chatId], {queryParams: this.queryParams()});
  }

  async doNewChat() {
    const agent = this.agent();
    if (!agent) {
      return;
    }

    await this.router.navigate([...this.basePath(), agent?.id, 'chat'], {queryParams: this.queryParams()});
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
      const output = await this.connection().submit('' + agentId, this.refId(), payload);

      this.loading.set(false);

      await this.router.navigate([...this.basePath(), agentId, 'chat', output.id], {queryParams: this.queryParams()});
    } catch (error) {
      this.response.set(this.error.convert(error));
      this.loading.set(false);
    }
  }

}
