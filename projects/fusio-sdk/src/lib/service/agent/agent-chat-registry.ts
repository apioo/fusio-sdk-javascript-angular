import {InjectionToken, Type} from '@angular/core';
import {Chat} from "../../abstract/agent/chat";

export class AgentChatRegistry extends Map<number, ChatType> {

  constructor(entries?: readonly (readonly [number, ChatType])[] | null) {
    super(entries);
  }

}

export interface ChatType {
  type: Type<Chat<any, any>>;
  label: string;
}

export const FUSIO_AGENT_CHAT_REGISTRY = new InjectionToken<AgentChatRegistry>(
  'FUSIO_AGENT_CHAT_REGISTRY'
);
