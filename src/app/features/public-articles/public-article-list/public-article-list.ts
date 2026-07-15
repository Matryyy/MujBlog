import { Component, inject } from '@angular/core';
import { PublicArticles } from '../../../services/public-articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../../../article.model';
import { RouterLink } from '@angular/router';
import { PreviewPipe } from '../../../preview-pipe';


@Component({
  selector: 'app-public-article-list',
  standalone: true,
  imports: [RouterLink, PreviewPipe],
  templateUrl: './public-article-list.html',
  styleUrl: './public-article-list.css',
})
export class PublicArticleList{
  private publicArticlesService = inject(PublicArticles);
  readonly publicArticles = toSignal(
    this.publicArticlesService.getPublicArticles(),
    {
      initialValue: [] as Article[],
    }
  );

  
}