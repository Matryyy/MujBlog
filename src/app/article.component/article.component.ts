import { Component, input } from '@angular/core';
import { Article } from '../article.model';
import { PreviewPipe } from "../preview-pipe";
import { ButtonComponent } from "../components/button/button";


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [PreviewPipe, ButtonComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  onDelete(): void {
    throw new Error('Method not implemented.');
}
  readonly adminMode = input<boolean>(false);
  readonly article = input.required<Article>();
}
