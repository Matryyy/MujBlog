import { Component, inject } from '@angular/core';
import { MyArticles } from '../../../services/my-articles.service';
import { RouterLink, Router } from '@angular/router'; 

@Component({
  selector: 'app-my-articles-list',
  imports: [RouterLink], 
  templateUrl: './my-articles-list.html',
  styleUrl: './my-articles-list.css',
})
export class MyArticlesList {
  private myArticlesService = inject(MyArticles);
  private router = inject(Router); 

  readonly articles = this.myArticlesService.articles;

}
