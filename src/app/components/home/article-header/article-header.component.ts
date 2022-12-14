import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent {

  @Input()
  articleTitle: string = ""

  @Input()
  articleImage: string = ""

  constructor() { }

}
