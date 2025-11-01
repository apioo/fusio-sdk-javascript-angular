import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {BackendScopeCategory, BackendScopeCategoryScope} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-scope-categories',
  templateUrl: './scope-categories.component.html',
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbNavOutlet
  ],
  styleUrls: ['./scope-categories.component.css']
})
export class ScopeCategoriesComponent implements OnInit {

  @Input() scopes?: Array<string>;
  @Input() disabled: boolean = false;
  @Output() dataChange = new EventEmitter<any>();

  categories = signal<Array<BackendScopeCategory>>([]);

  selected: Array<string> = [];
  selectedCategory: number = 1;
  toggleScope: boolean = true;

  constructor(private fusio: FusioService) {
  }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().scope().getCategories();
    if (response.categories) {
      this.categories.set(response.categories);
    }

    if (this.scopes) {
      this.selected = this.scopes;
    }
  }

  scopeSelect(event: any, scope?: string) {
    const selected = event.target.checked;
    if (!scope) {
      return;
    }

    if (selected) {
      this.addScope(scope);
    } else {
      this.removeScope(scope);
    }

    this.dataChange.emit(this.selected)
  }

  toggleScopes(scopes?: Array<BackendScopeCategoryScope>) {
    if (!scopes) {
      return;
    }

    scopes.forEach((scope) => {
      if (!scope.name) {
        return;
      }
      if (this.toggleScope) {
        this.addScope(scope.name);
      } else {
        this.removeScope(scope.name);
      }
    });

    this.dataChange.emit(this.selected)
    this.toggleScope = !this.toggleScope;
  }

  private addScope(scope: string) {
    this.selected.push(scope)
  }

  private removeScope(scope: string) {
    this.selected = this.selected.filter((value) => {
      return value !== scope;
    });
  }
}
