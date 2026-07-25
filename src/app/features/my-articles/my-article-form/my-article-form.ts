import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MyArticles } from '../../../services/my-articles.service';
import { ButtonComponent } from '../../../components/button/button';

@Component({
  selector: 'app-my-article-form',
  imports: [ReactiveFormsModule, ButtonComponent], 
  templateUrl: './my-article-form.html',
  styleUrl: './my-article-form.css',
})
export class MyArticleForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private myArticlesService = inject(MyArticles);
  isEditMode = false;
  articleId: string | null = null;

  readonly articleForm =  this.fb.group({
    title: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required.bind(Validators)] }),
    content: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required.bind(Validators)] })
  });

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    if (this.articleId) {
      this.isEditMode = true;
      const article = this.myArticlesService.getMyArticleByID(this.articleId);
      if (article) {
        this.articleForm.patchValue({
          title: article.title,
          content: article.content,
        });
      }
    } 
  }  

  onSubmit = (): void => {
    if (this.articleForm.invalid) {
      return;
    }
    const { title, content } = this.articleForm.getRawValue();
    if (this.isEditMode && this.articleId) {
      this.myArticlesService.updateMyArticle(this.articleId, title, content);
    } else {
      this.myArticlesService.addMyArticle(title, content);
    }
    void this.router.navigate(['/my-articles']);
  }

  cancel(): void {
    void this.router.navigate(['/my-articles']);
  }
}
