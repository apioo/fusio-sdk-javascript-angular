import {Component, computed, inject, input, output, resource, signal} from '@angular/core';
import {AgentItem, AgentOutput, CommonMessage, ConsumerAgent, ConsumerAgentMessage} from "fusio-sdk";
import {Agent, AgentContent, ExecutionIndicator, Message} from "../agent";
import {ErrorService} from "../../service/error.service";
import {Connection} from "./connection";

@Component({
  template: '',
})
export abstract class Chat<TModel, TOptions = undefined> {

  connection = input.required<Connection>();
  agent = input.required<ConsumerAgent>();
  chatId = input.required<string>();
  refId = input<number>(0);

  sendListener = input.required<(output: AgentOutput) => void>();
  loadListener = input.required<(model: TModel) => void>();
  executeListener = input.required<(response: CommonMessage) => void>();

  model = signal<TModel|undefined>(undefined);

  output = signal<AgentItem|undefined>(undefined);
  loading = signal<boolean>(false);
  executeLoading = signal<boolean>(false);
  executeMessages = signal<Array<Message>>([]);
  response = signal<CommonMessage|undefined>(undefined);

  messagesResource = resource<Array<ConsumerAgentMessage>, MessagesResourceParams>({
    params: () => ({
      agent: this.agent(),
      chatId: this.chatId(),
      refId: this.refId(),
      output: this.output(),
    }),
    loader: async (params) => {
      const collection = await this.connection().getMessages(params.params);
      const entries = collection.entry || [];

      let lastMessage: ConsumerAgentMessage|undefined;
      const messages: Array<ConsumerAgentMessage> = [];
      entries.forEach((message) => {
        messages.push(message);

        if (message.role === 'assistant') {
          lastMessage = message;
        }
      });

      try {
        if (lastMessage && lastMessage.item) {
          this.load(lastMessage.item);
        } else {
          this.onEmpty();
        }
      } catch (error) {
        this.response.set(this.error.convert(error));
      }

      return messages;
    }
  });

  messages = computed<Array<ConsumerAgentMessage>|undefined>(() => {
    if (this.messagesResource.hasValue()) {
      return this.messagesResource.value();
    }

    return undefined;
  });

  protected error = inject(ErrorService);

  abstract getAgent(): Agent<TModel, TOptions>;

  async doSend(message: string) {
    if (!message) {
      return;
    }

    const agentId = this.agent().id;
    if (!agentId) {
      return;
    }

    this.loading.set(true);

    try {
      const output = await this.getAgent().prompt(this.connection(), agentId, message, this.refId(), this.chatId());
      const content = output?.item;

      this.output.set(content);

      this.onSend();

      this.scrollToBottom();

      const listener = this.sendListener();
      if (listener && output) {
        listener(output);
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
  }

  load(content?: AgentContent): void {
    if (!content) {
      return;
    }

    this.executeMessages.set([]);

    const model = this.getAgent().transform(content);
    this.model.set(model);

    this.onLoad();

    const listener = this.loadListener();
    if (listener && model) {
      listener(model);
    }
  }

  async execute(): Promise<void> {
    const model = this.model();
    if (!model) {
      return;
    }

    this.executeLoading.set(true);

    try {
      const executeMessages = this.executeMessages;
      const indicator = new ExecutionIndicator((message: Message) => {
        executeMessages.update((messages) => {
          return messages.concat([message]);
        });
      });

      const options = this.getOptions();

      const response = await this.getAgent().execute(this.connection(), model, indicator, options);
      this.response.set(response);

      if (response) {
        this.onExecute(response);

        const listener = this.executeListener();
        if (listener) {
          listener(response);
        }
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.executeLoading.set(false);
  }

  protected onLoad(): void {
  }

  protected onEmpty(): void {
  }

  protected onSend(): void {
  }

  protected onExecute(message: CommonMessage): void {
  }

  protected getOptions(): TOptions|undefined {
    return;
  }

  scrollToBottom(): void {
    window.setTimeout(() => {
      let messagesBottom = document.getElementById('messages-bottom');
      if (messagesBottom !== null) {
        messagesBottom.scrollIntoView();
      }
    }, 500);
  }

}

export interface MessagesResourceParams {
  agent: ConsumerAgent
  refId: number
  chatId: string
  output: AgentItem|undefined
}
