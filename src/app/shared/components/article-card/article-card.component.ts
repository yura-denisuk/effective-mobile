import {Component, Input} from '@angular/core';
import {AllArticlesType} from "../../../../types/all-articles.type";



@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: AllArticlesType;

  constructor() {
  }

}
