import { Component, inject, input } from '@angular/core';
import { PublicArticles } from '../../../services/public-articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, filter } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router'; 
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button';

@Component({
  selector: 'app-public-article-detail',
  standalone: true,
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
      switchMap((currentId) =>
        this.publicArticlesService.getPublicArticleByID(currentId)
      )
    ),
    { initialValue: null }
  );

  goBackToList() {
    this.router.navigate(['/public-articles']); 
  }
}
