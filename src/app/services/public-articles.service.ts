import { inject, Injectable } from '@angular/core';
import { Article } from '../article.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PublicArticles {
    private http = inject(HttpClient);
    private readonly apiUrl = 'https://6875218fdd06792b9c96e3d0.mockapi.io/articles';
    getPublicArticles() {
        return this.http.get<Article[]>(this.apiUrl);
    }
    getPublicArticleByID(id: string) {
        return this.http.get<Article>(`${this.apiUrl}/${id}`);
    }
}

