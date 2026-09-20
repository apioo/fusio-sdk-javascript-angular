import {Component, computed, inject, input} from '@angular/core';
import {FUSIO_AGENT_CHAT_REGISTRY} from "../../../service/agent/agent-chat-registry";

@Component({
  selector: 'fusio-agent-message-type',
  imports: [
  ],
  templateUrl: './type.html',
  styleUrl: './type.css',
})
export class Type {

  private registry = inject(FUSIO_AGENT_CHAT_REGISTRY, { optional: true });

  value = input.required<number|undefined>()

  typeName = computed<string>(() => {
    const value = this.value();
    if (value === undefined) {
      return 'Unknown';
    }

    const type = this.registry?.get(value);
    if (type === undefined) {
      return 'Unknown';
    }

    return type.name;
  });

}
