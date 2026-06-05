import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {Row} from "../../row/row";
import {Input} from "../../input/input";
import {Agent, AgentContent} from "../../../../abstract/agent";
import {AgentGeneralService} from "../../../../service/agent/agent-general.service";
import {ChatAbstract} from "../../chat-abstract";
import {MessageComponent} from "../../../message/message.component";

@Component({
  selector: 'app-agent-message-general',
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
export class General extends ChatAbstract<AgentContent> {

  generalAgent = inject(AgentGeneralService);

  getAgent(): Agent<AgentContent> {
    return this.generalAgent;
  }

}
