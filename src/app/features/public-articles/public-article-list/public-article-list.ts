import { Component, inject } from '@angular/core';
import { PublicArticles } from '../../../services/public-articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../../../article.model';
import { ArticleComponent } from "../../../article.component/article.component";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-article-list',
  standalone: true,
  imports: [ArticleComponent], 
  templateUrl: './public-article-list.html',
  styleUrls: ['./public-article-list.css'],
})
export class PublicArticleList {
  private publicArticlesService = inject(PublicArticles);
  private router = inject(Router);

  readonly publicArticles = toSignal(
    this.publicArticlesService.getPublicArticles() as Observable<Article[]>,
    { initialValue: [] as Article[] }
  );

}
