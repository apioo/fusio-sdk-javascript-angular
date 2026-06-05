import {AgentInput, AgentOutput, ConsumerAgent, ConsumerAgentMessageCollection} from "fusio-sdk";
import {inject, Injectable} from "@angular/core";
import {FusioService} from "../fusio.service";
import {MessagesResourceParams} from "../../component/agent/chat-abstract";

@Injectable({
  providedIn: 'root'
})
export class AgentConnectionService implements AgentConnectionInterface {

  private fusio = inject(FusioService);

  async getMessages(params: MessagesResourceParams): Promise<ConsumerAgentMessageCollection> {
    return this.fusio.getClient().consumer().agent().message().getAll('' + params.agent.id, params.chatId);
  }

  async getChats(agentId: string): Promise<ConsumerAgentMessageCollection> {
    return this.fusio.getClient().consumer().agent().message().getAll(agentId);
  }

  async get(agentId: string): Promise<ConsumerAgent> {
    return this.fusio.getClient().consumer().agent().get(agentId);
  }

  async submit(agentId: string, input: AgentInput): Promise<AgentOutput> {
    return this.fusio.getClient().consumer().agent().message().submit(agentId, input);
  }

}

export interface AgentConnectionInterface {

  getMessages(params: MessagesResourceParams): Promise<ConsumerAgentMessageCollection>;

  getChats(agentId: string): Promise<ConsumerAgentMessageCollection>;

  get(agentId: string): Promise<ConsumerAgent>;

  submit(agentId: string, input: AgentInput): Promise<AgentOutput>;

}
