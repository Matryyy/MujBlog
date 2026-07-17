import { Article } from '../article.model';
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MyArticles {
    private platformId = inject(PLATFORM_ID);
    private myArticlesSignal = signal<Article[]>([]);
    readonly articles = this.myArticlesSignal.asReadonly();

    constructor() {
        this.loadFromStorage();
    }


    loadFromStorage(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const storedArticles = localStorage.getItem('articles');
        if (storedArticles) {
            this.myArticlesSignal.set(JSON.parse(storedArticles) as Article[]);
        }
    }

    getMyArticleByID(id: string): Article | undefined {
        return this.myArticlesSignal().find((article) => article.id === id);
    }

    addMyArticle(title: string, content: string): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.myArticlesSignal.update((articles) => [
            ...articles,
            {
                id: crypto.randomUUID(),
                title,
                content,
                created_at: new Date().toISOString(),
            },
        ]);

        localStorage.setItem('articles', JSON.stringify(this.myArticlesSignal()));
    }

    updateMyArticle(id: string, title: string, content: string): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.myArticlesSignal.update((articles) =>
            articles.map((article) =>
                article.id === id ? { ...article, title, content } : article
            )
        );
        localStorage.setItem('articles', JSON.stringify(this.myArticlesSignal()));
    }

    deleteMyArticle(id: string): Observable<boolean> {
        if (!isPlatformBrowser(this.platformId)) {
            return of(false); 
        }
        this.myArticlesSignal.update((articles) =>
            articles.filter((article) => article.id !== id)
        );
        localStorage.setItem('articles', JSON.stringify(this.myArticlesSignal()));
        return of(true); 
    }
}
