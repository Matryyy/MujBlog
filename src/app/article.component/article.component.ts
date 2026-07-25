import { Component, input, output } from '@angular/core';
import { Article } from '../article.model';
import { PreviewPipe } from "../preview-pipe";
import { ButtonComponent } from "../components/button/button";


@Component({
  selector: 'app-article',
  imports: [PreviewPipe, ButtonComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  readonly isAdminMode = input<boolean>(false);
  readonly article = input.required<Article>();
  readonly delete = output();

  onDelete(): void {
    this.delete.emit();
  }
}
