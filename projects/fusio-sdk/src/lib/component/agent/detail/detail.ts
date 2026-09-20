import {Component, inject} from '@angular/core';
import {Container} from "../container/container";
import {AgentConsumerConnectionService} from "../../../service/agent/agent-consumer-connection.service";

@Component({
  selector: 'fusio-agent-detail',
  imports: [
    Container
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  connection = inject(AgentConsumerConnectionService);

}
