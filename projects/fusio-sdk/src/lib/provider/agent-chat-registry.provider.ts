import {Provider} from '@angular/core';
import {AgentChatRegistry, ChatType, FUSIO_AGENT_CHAT_REGISTRY} from '../service/agent/agent-chat-registry';
import {General} from "../component/agent/chat/general/general";

export const DEFAULT_AGENT_CHAT_TYPES: [number, ChatType][] = [
  [0, {type: General, label: 'General'}],
];

export function provideAgentChatTypes(customTypes: [number, ChatType][] = []): Provider {
  return {
    provide: FUSIO_AGENT_CHAT_REGISTRY,
    useFactory: () => {
      const map: AgentChatRegistry = new AgentChatRegistry(DEFAULT_AGENT_CHAT_TYPES);
      customTypes.forEach(([type, component]) => map.set(type, component));
      return map;
    }
  };
}
