import { Component, inject } from '@angular/core';
import { PublicArticles } from '../../../services/public-articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleComponent } from "../../../article.component/article.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-article-list',
  imports: [ArticleComponent], 
  templateUrl: './public-article-list.html',
  styleUrls: ['./public-article-list.css'],
})
export class PublicArticleList {
  private publicArticlesService = inject(PublicArticles);
  private router = inject(Router);

  readonly publicArticles = toSignal(
    this.publicArticlesService.getPublicArticles(),
    { initialValue: [] }
  );

}
