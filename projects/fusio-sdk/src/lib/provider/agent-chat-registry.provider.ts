import {Provider, Type} from '@angular/core';
import {AgentChatRegistry, FUSIO_AGENT_CHAT_REGISTRY} from '../service/agent/agent-chat-registry';
import {Chat} from "../abstract/agent/chat";
import {General} from "../component/agent/chat/general/general";

export const DEFAULT_AGENT_CHAT_TYPES: [number, Type<Chat<any>>][] = [
  [0, General],
];

export function provideAgentChatTypes(customTypes: [number, Type<Chat<any>>][] = []): Provider {
  return {
    provide: FUSIO_AGENT_CHAT_REGISTRY,
    useFactory: () => {
      const map: AgentChatRegistry = new Map(DEFAULT_AGENT_CHAT_TYPES);
      customTypes.forEach(([type, component]) => map.set(type, component));
      return map;
    }
  };
}
