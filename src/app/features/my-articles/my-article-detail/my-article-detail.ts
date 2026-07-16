import { Component, inject, computed, input } from '@angular/core';
import { MyArticles } from '../../../services/my-articles.service';
import { Router, RouterLink } from '@angular/router'; 
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button';

@Component({
  selector: 'app-my-article-detail',
  imports: [RouterLink, DatePipe, ButtonComponent], 
  templateUrl: './my-article-detail.html',
  styleUrl: './my-article-detail.css',
})
export class MyArticleDetail {
  private myArticlesService = inject(MyArticles);
  private router = inject(Router); 
  readonly id = input<string>();

  deleteArticle(articleId: string): void {
    if (confirm('Opravdu chcete smazat tento článek? Tato akce je nevratná.')) {
      this.myArticlesService.deleteMyArticle(articleId).subscribe({
        next: (success) => {
          if (success) {
            console.log(`Článek s ID ${articleId} byl úspěšně smazán.`);
            this.router.navigate(['/my-articles']); 
          } else {
            alert('Nepodařilo se smazat článek. Zkuste to prosím znovu.');
          }
        },
        error: (err) => {
          console.error(`Chyba při mazání článku s ID ${articleId}:`, err);
          alert('Nepodařilo se smazat článek. Zkuste to prosím znovu.');
        }
      });
    }
  }

  goBackToList() {
    this.router.navigate(['/my-articles']);
  }

  currentArticle = computed(() => {
    const currentId = this.id();
    if (!currentId) return undefined;
    return this.myArticlesService.getMyArticleByID(currentId);
  });

}
