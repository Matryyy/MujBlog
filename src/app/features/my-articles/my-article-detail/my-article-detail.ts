import { Component, inject, computed, input } from '@angular/core';
import { MyArticles } from '../../../services/my-articles.service';
import { Router, RouterLink } from '@angular/router'; // Přidáno Router, RouterLink do imports
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-article-detail',
  imports: [RouterLink, DatePipe], // Zde je potřeba přidat RouterLink
  templateUrl: './my-article-detail.html',
  styleUrl: './my-article-detail.css',
})
export class MyArticleDetail {
  private myArticlesService = inject(MyArticles);
  private router = inject(Router); // Injektujeme Router pro programovou navigaci
  readonly id = input<string>();

  deleteArticle(articleId: string): void {
    if (confirm('Opravdu chcete smazat tento článek? Tato akce je nevratná.')) {
      this.myArticlesService.deleteMyArticle(articleId).subscribe({
        next: (success) => {
          if (success) {
            console.log(`Článek s ID ${articleId} byl úspěšně smazán.`);
            this.router.navigate(['/my-articles']); // Přesměrování na seznam článků
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

  currentArticle = computed(() => {
    const currentId = this.id();
    if (!currentId) return undefined;
    return this.myArticlesService.getMyArticleByID(currentId);
  });

}
