import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  createdAt: Date;
}

@Component({
  selector: 'app-article.component',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  @Input() article!: Article;
}
