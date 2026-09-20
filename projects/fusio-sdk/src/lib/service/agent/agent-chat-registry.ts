import {InjectionToken, Type} from '@angular/core';
import {Chat} from "../../abstract/agent/chat";

export class AgentChatRegistry extends Map<number, Type<Chat<any>>> {

  constructor(entries?: readonly (readonly [number, Type<Chat<any>>])[] | null) {
    super(entries);
  }

}

export const FUSIO_AGENT_CHAT_REGISTRY = new InjectionToken<AgentChatRegistry>(
  'FUSIO_AGENT_CHAT_REGISTRY'
);
