import { Component, inject, input } from '@angular/core';
import { PublicArticles } from '../../../services/public-articles.service';
import { Article } from '../../../article.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, filter } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-article-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './public-article-detail.html',
  styleUrl: './public-article-detail.css',
})
export class PublicArticleDetail {
  private publicArticlesService = inject(PublicArticles);
  readonly id = input<string>();
  readonly article = toSignal(
    toObservable(this.id).pipe(
      filter((currentId): currentId is string => !!currentId),
      switchMap((currentId) =>
        this.publicArticlesService.getPublicArticleByID(currentId)
      )
    ),
    { initialValue: null }
  );
}
