import {Component, input} from '@angular/core';

@Component({
  selector: 'fusio-scopes',
  templateUrl: './scopes.component.html',
  styleUrls: ['./scopes.component.css']
})
export class ScopesComponent {

  scopes = input<Array<string>|undefined>(undefined);

}
