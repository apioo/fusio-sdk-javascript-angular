import {Injectable} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {AgentAbstract, AgentContent, ExecutionIndicator} from "../../abstract/agent";
import {Connection} from "../../abstract/agent/connection";

@Injectable({
  providedIn: 'root'
})
export class AgentGeneralService extends AgentAbstract<AgentContent> {

  transform(content: AgentContent): AgentContent|undefined {
    return content;
  }

  async execute(connection: Connection, model: AgentContent, indicator: ExecutionIndicator): Promise<CommonMessage|undefined> {
    return {
      success: true,
      message: 'Nothing to execute'
    };
  }

}
