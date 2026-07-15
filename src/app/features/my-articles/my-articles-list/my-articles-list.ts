import { Component } from '@angular/core';
import { MyArticles } from '../../../services/my-articles.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-articles-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-articles-list.html',
  styleUrl: './my-articles-list.css',
})
export class MyArticlesList {
  private myArticlesService = inject(MyArticles);
  readonly articles = this.myArticlesService.articles;
}
