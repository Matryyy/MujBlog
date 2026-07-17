import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../article.model';
import { RouterLink } from '@angular/router';
import { ArticleComponent } from "./article.component";

@Component({
  selector: 'app-my-article-list',
  standalone: true,
  imports: [RouterLink, ArticleComponent],
  templateUrl: './my-article-list.html',
  styleUrls: ['./my-article-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyArticleListComponent {
  myArticles = signal<Article[]>([]);

  constructor() {
    this.loadMyArticles();
  }

  loadMyArticles(): void {
       this.myArticles.set([]);
  }

  onArticleDelete(articleId: string): void {
    if (confirm('Opravdu si přejete smazat tento článek?')) {
      console.log(`Požadavek na smazání článku s ID: ${articleId}`);
    }
  }
}