import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {Row} from "../../row/row";
import {Input} from "../../input/input";
import {Agent, AgentContent} from "../../../../abstract/agent";
import {AgentGeneralService} from "../../../../service/agent/agent-general.service";
import {Chat} from "../../../../abstract/agent/chat";
import {MessageComponent} from "../../../message/message.component";

@Component({
  selector: 'fusio-agent-message-general',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TypeschemaEditorModule,
    Input,
    Row,
    Row,
    Input,
    MessageComponent
  ],
  templateUrl: './general.html',
  styleUrl: './general.css',
})
export class General extends Chat<AgentContent> {

  generalAgent = inject(AgentGeneralService);

  getAgent(): Agent<AgentContent> {
    return this.generalAgent;
  }

}
