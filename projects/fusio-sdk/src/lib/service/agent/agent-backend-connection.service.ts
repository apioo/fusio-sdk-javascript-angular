import {AgentInput, AgentOutput, ConsumerAgent, ConsumerAgentMessageCollection} from "fusio-sdk";
import {inject, Injectable} from "@angular/core";
import {FusioService} from "../fusio.service";
import {MessagesResourceParams} from "../../abstract/agent/chat";
import {Connection} from "../../abstract/agent/connection";

@Injectable({
  providedIn: 'root'
})
export class AgentBackendConnectionService implements Connection {

  private fusio = inject(FusioService);

  async getMessages(params: MessagesResourceParams): Promise<ConsumerAgentMessageCollection> {
    return this.fusio.getClient().backend().agent().message().getAll('' + params.agent.id, params.refId, params.chatId);
  }

  async getChats(agentId: string, refId: number): Promise<ConsumerAgentMessageCollection> {
    return this.fusio.getClient().backend().agent().message().getAll(agentId, refId);
  }

  async get(agentId: string): Promise<ConsumerAgent> {
    return this.fusio.getClient().backend().agent().get(agentId);
  }

  async submit(agentId: string, refId: number, input: AgentInput): Promise<AgentOutput> {
    return this.fusio.getClient().backend().agent().message().submit(agentId, input, refId);
  }

}
