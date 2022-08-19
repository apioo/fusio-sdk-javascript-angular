import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fusio-scopes',
  templateUrl: './scopes.component.html',
  styleUrls: ['./scopes.component.css']
})
export class ScopesComponent implements OnInit {

  @Input() scopes?: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
