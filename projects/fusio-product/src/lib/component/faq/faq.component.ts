import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Question} from "../../config/config";

@Component({
  selector: 'fusio-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  description?: string;
  questions?: Array<Question>;

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.description = this.config.getFaqConfig()?.description;
    this.questions = this.config.getFaqConfig()?.questions;
  }

}
