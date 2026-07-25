import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleComponent } from "./article.component";
import { MyArticles } from '../services/my-articles.service';

@Component({
  selector: 'app-my-article-list',
  imports: [RouterLink, ArticleComponent],
  templateUrl: './my-article-list.html',
  styleUrls: ['./my-article-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyArticleListComponent {
  private readonly myArticlesService = inject(MyArticles);
  readonly myArticles = this.myArticlesService.articles;

  onArticleDelete(articleId: string): void {
    if (confirm('Opravdu si přejete smazat tento článek?')) {
      this.myArticlesService.deleteMyArticle(articleId);
    }
  }
}