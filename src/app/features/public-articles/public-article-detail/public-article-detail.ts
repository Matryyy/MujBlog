import { Component, inject, input } from '@angular/core';
import { PublicArticles } from '../../../services/public-articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, filter, from } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router'; 
import { DatePipe } from '@angular/common';
import { Article } from '../../../article.model';
import { ButtonComponent } from '../../../components/button/button';

@Component({
  selector: 'app-public-article-detail',
  imports: [DatePipe, ButtonComponent], 
  templateUrl: './public-article-detail.html',
  styleUrl: './public-article-detail.css',
})
export class PublicArticleDetail {
  private publicArticlesService = inject(PublicArticles);
  private router = inject(Router); 
  
  readonly id = input<string>();
  readonly article = toSignal(
    toObservable(this.id).pipe(
      filter((currentId): currentId is string => !!currentId),
      switchMap((currentId) => from(this.publicArticlesService.getPublicArticleByID(currentId) as Promise<Article>))),
    { initialValue: null }
  );

  goBackToList(): Promise<boolean> {
    return this.router.navigate(['/public-articles']);
  }
}
