import {AgentInput, AgentOutput, BackendAgentMessageCollection} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {FusioService} from "./fusio.service";
import {MessagesResourceParams} from "../component/agent/chat-abstract";

@Injectable({
  providedIn: 'root'
})
export class AgentService implements AgentInterface {

  constructor(private fusio: FusioService) {
  }

  async getAll(params: MessagesResourceParams): Promise<BackendAgentMessageCollection> {
    return this.fusio.getClient().backend().agent().message().getAll('' + params.agent.id, params.chatId);
  }

  async submit(agentId: number, input: AgentInput): Promise<AgentOutput> {
    return this.fusio.getClient().backend().agent().message().submit('' + agentId, input);
  }

}

export interface AgentInterface {

  getAll(params: MessagesResourceParams): Promise<BackendAgentMessageCollection>;

  submit(agentId: number, input: AgentInput): Promise<AgentOutput>;

}
