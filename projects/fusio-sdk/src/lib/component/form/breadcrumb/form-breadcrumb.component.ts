import {Component, input} from '@angular/core';

@Component({
  selector: 'fusio-form-breadcrumb',
  imports: [],
  templateUrl: './form-breadcrumb.component.html',
  styleUrl: './form-breadcrumb.component.css',
})
export class FormBreadcrumbComponent {

  mode = input.required<number>();

}
