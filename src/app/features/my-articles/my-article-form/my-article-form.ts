import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyArticles } from '../../../services/my-articles.service';
import { ButtonComponent } from '../../../components/button/button';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { Article } from '../../../article.model';

@Component({
  selector: 'app-my-article-form',
  imports: [ReactiveFormsModule, ButtonComponent], 
  templateUrl: './my-article-form.html',
  styleUrl: './my-article-form.css',
})
export class MyArticleForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly myArticlesService = inject(MyArticles);

  readonly isEditMode = signal(false);
  
  readonly articleId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))), { initialValue: null });

  private readonly article = toSignal<Article | null | undefined>(
    toObservable(this.articleId).pipe(
      switchMap(id => {
        if (!id) {
          return of(null);
        }
        return of(this.myArticlesService.getMyArticleByID(id));
      })
    ),
    { initialValue: null }
  );

  readonly articleForm =  this.fb.group({
    title: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required.bind(Validators)] }),
    content: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required.bind(Validators)] })
  });

  constructor() {
    effect(() => {
      const currentArticle = this.article();
      if (currentArticle) {
        this.isEditMode.set(true);
        this.articleForm.patchValue({
          title: currentArticle.title,
          content: currentArticle.content,
        });
      } else {
        this.isEditMode.set(false);
        this.articleForm.reset();
      }
    });
  }

  onSubmit = (): void => {
    if (this.articleForm.invalid) {
      return;
    }
    const { title, content } = this.articleForm.getRawValue();
    const id = this.articleId();
    if (this.isEditMode() && id) {
      this.myArticlesService.updateMyArticle(id, title, content);
    } else {
      this.myArticlesService.addMyArticle(title, content);
    }
    void this.router.navigate(['/my-articles']);
  }

  cancel(): void {
    void this.router.navigate(['/my-articles']);
  }
}
