import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MyArticles } from '../../../services/my-articles.service';
import { ButtonComponent } from '../../../components/button/button';

@Component({
  selector: 'app-my-article-form',
  standalone: true,
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
    title: this.fb.control<string>('', { nonNullable: true }),
    content: this.fb.control<string>('', { nonNullable: true })
  });

  ngOnInit() {
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

  onSubmit() {
    if (this.articleForm.valid) {
      const { title, content } = this.articleForm.value;
      if (this.articleForm.invalid|| !title || !content) {
        return;
      }
      if (this.isEditMode && this.articleId) {
        this.myArticlesService.updateMyArticle(this.articleId, title, content);
      } else {
        this.myArticlesService.addMyArticle(title, content);
      }
      this.router.navigate(['/my-articles']);
    }
  }

  cancel() {
    this.router.navigate(['/my-articles']);
  }
}
