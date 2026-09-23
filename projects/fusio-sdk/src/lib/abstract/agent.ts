import {
  AgentInput,
  AgentItemBinary,
  AgentItemChoice,
  AgentItemObject,
  AgentItemText,
  AgentItemToolCall,
  AgentOutput,
  CommonMessage
} from "fusio-sdk";
import {Connection} from "./agent/connection";

export interface Agent<TModel, TOptions = undefined> {

  /**
   * Sends a prompt to a specific agent and returns the content
   */
  prompt(connection: Connection, agentId: number, prompt: string, refId: number, chatId?: string): Promise<AgentOutput|undefined>;

  /**
   * Transforms the agent content into a model
   */
  transform(content: AgentContent): TModel|undefined;

  /**
   * Executes the provided model, mostly this means that we create or update the model
   */
  execute(connection: Connection, model: TModel, indicator: ExecutionIndicator, options?: TOptions): Promise<CommonMessage|undefined>;

}

export abstract class AgentAbstract<TModel, TOptions = undefined> implements Agent<TModel, TOptions> {

  async prompt(connection: Connection, agentId: number, prompt: string, refId: number, chatId?: string): Promise<AgentOutput> {
    const input: AgentInput = {
      previousId: chatId,
      item: {
        type: 'text',
        content: prompt,
      }
    };

    return await connection.submit('' + agentId, refId, input);
  }

  abstract transform(content: AgentContent): TModel|undefined;

  abstract execute(connection: Connection, model: TModel, indicator: ExecutionIndicator, options?: TOptions): Promise<CommonMessage|undefined>;

  protected getText(content: AgentContent): string|undefined {
    if (content.type === 'text' && content.content) {
      return content.content;
    }

    return;
  }

  protected getJson(content: AgentContent): object|undefined {
    if (content.type === 'object' && content.payload) {
      return content.payload;
    }

    return;
  }

}

export class ExecutionIndicator {

  constructor(private callback: Function) {
  }

  request(message: string) {
    const result: Message = {
      level: 'info',
      message: '> ' + message,
    };

    this.callback.apply(null, [result]);
  }

  response(message?: CommonMessage) {
    if (!message || !message.message) {
      return;
    }

    let result: Message|undefined = undefined;
    if (message.success === true) {
      result = {
        level: 'success',
        message: '< ' + message.message,
      };
    } else if (message.success === false) {
      result = {
        level: 'danger',
        message: '< ' + message.message,
      };
    }

    if (result !== undefined) {
      this.callback.apply(null, [result]);
    }
  }

}

export interface Message
{
  level: Level,
  message: string,
}

export type Level = 'info'|'danger'|'success';

export type AgentContent = AgentItemBinary | AgentItemChoice | AgentItemObject | AgentItemText | AgentItemToolCall;
