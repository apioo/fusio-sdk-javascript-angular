import {AgentInput, AgentOutput, ConsumerAgent, ConsumerAgentMessageCollection} from "fusio-sdk";
import {MessagesResourceParams} from "./chat";

export interface Connection {

  getMessages(params: MessagesResourceParams): Promise<ConsumerAgentMessageCollection>;

  getChats(agentId: string, refId: number): Promise<ConsumerAgentMessageCollection>;

  get(agentId: string): Promise<ConsumerAgent>;

  submit(agentId: string, refId: number, input: AgentInput): Promise<AgentOutput>;

}
