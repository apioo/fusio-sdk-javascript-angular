import {Component, computed, inject, input, OnInit, output, resource, signal} from '@angular/core';
import {AgentOutput, CommonMessage, ConsumerAgent, ConsumerAgentMessage} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
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
  agentId = input<string|undefined>(undefined);
  refId = input<number|undefined>(undefined);
  chatId = input<string|undefined>(undefined);

  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  agentResource = resource<ConsumerAgent|undefined, { agentId: string|undefined }>({
    params: () => ({
      agentId: this.selectedAgentId(),
    }),
    loader: async (params) => {
      const agentId = params.params.agentId;
      if (!agentId) {
        return;
      }

      const agent = await this.connection().get(agentId);
      if (!agent) {
        return;
      }

      this.agentLoad.emit(agent);

      return agent;
    }
  });

  chatResource = resource<Array<ConsumerAgentMessage>, { agentId: number|undefined, refId: number }>({
    params: () => ({
      agentId: this.agentResource.hasValue() ? this.agentResource.value()?.id : undefined,
      refId: this.selectedRefId(),
    }),
    loader: async (params) => {
      const agentId = params.params.agentId;
      if (!agentId) {
        return [];
      }

      const collection = await this.connection().getChats('' + agentId, params.params.refId);
      return collection.entry || [];
    }
  });

  queryAgentId = signal<string|undefined>(undefined);
  queryRefId = signal<number>(0);
  queryChatId = signal<string|undefined>(undefined);

  agentLoad = output<ConsumerAgent>();

  selectedAgentId = computed<string|undefined>(() => {
    const agentId = this.agentId();
    if (agentId !== undefined) {
      return agentId;
    }

    return this.queryAgentId();
  });

  selectedRefId = computed<number>(() => {
    const refId = this.refId();
    if (refId !== undefined) {
      return refId;
    }

    return this.queryRefId();
  });

  selectedChatId = computed<string|undefined>(() => {
    const chatId = this.chatId();
    if (chatId !== undefined) {
      return chatId;
    }

    return this.queryChatId();
  });

  queryParams = computed<Record<string, any>>(() => {
    const queryParams: Record<string, any> = {};
    const refId = this.queryRefId();
    if (refId > 0) {
      queryParams['ref_id'] = refId;
    }

    return queryParams;
  });

  selectedMessageComponent = computed(() => {
    if (!this.agentResource.hasValue()) {
      return null;
    }

    const type = this.agentResource.value().type;
    if (type === undefined || !this.registry) {
      return null;
    }

    return this.registry.get(type)?.type;
  });

  componentInputs = computed(() => {
    return {
      connection: this.connection(),
      agent: this.agentResource.hasValue() ? this.agentResource.value() : undefined,
      refId: this.selectedRefId(),
      chatId: this.selectedChatId(),
      sendListener: (output: AgentOutput) => this.onSend(output),
      loadListener: (model: any) => this.onLoad(model),
      executeListener: (response: CommonMessage) => this.onExecute(response),
    };
  });

  resolvedBasePath = computed<Array<string>>(() => {
    const basePath = this.basePath();
    const agentId = this.agentResource.hasValue() ? this.agentResource.value().id : undefined;

    const result: Array<string> = [];
    basePath.forEach((path) => {
      if (path === '{agent_id}') {
        result.push('' + agentId);
      } else {
        result.push(path);
      }
    });

    return result;
  });

  private registry = inject(FUSIO_AGENT_CHAT_REGISTRY);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (params['ref_id']) {
        this.queryRefId.set(parseInt(params['ref_id']));
      } else {
        this.queryRefId.set(0);
      }
    });

    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        this.queryAgentId.set(params['id']);
      }
      if (params['chat_id']) {
        this.queryChatId.set(params['chat_id']);
      } else {
        this.queryChatId.set(undefined);
      }
    });
  }

  async loadChat(chat: ConsumerAgentMessage) {
    if (!this.agentResource.hasValue()) {
      return;
    }

    await this.router.navigate([...this.resolvedBasePath(), chat.chatId], {queryParams: this.queryParams()});
  }

  async doNewChat() {
    if (!this.agentResource.hasValue()) {
      return;
    }

    await this.router.navigate([...this.resolvedBasePath()], {queryParams: this.queryParams()});
  }

  async onSend(output: AgentOutput) {
    if (!this.agentResource.hasValue()) {
      return;
    }

    const chatId = this.selectedChatId();
    if (chatId) {
      return;
    }

    await this.router.navigate([...this.resolvedBasePath(), output.id], {queryParams: this.queryParams()});
  }

  onLoad(model: any) {
  }

  onExecute(response: CommonMessage) {
  }

}
