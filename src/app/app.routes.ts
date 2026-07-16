import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'my-articles',
    loadComponent: () => import('./features/my-articles/my-articles-list/my-articles-list').then(m => m.MyArticlesList)
  },
  {
    path: 'my-articles/new',
    loadComponent: () => import('./features/my-articles/my-article-form/my-article-form').then(m => m.MyArticleForm)
  },
  {
    path: 'my-articles/edit/:id',
    loadComponent: () => import('./features/my-articles/my-article-form/my-article-form').then(m => m.MyArticleForm)
  },
  {
    path: 'my-articles/:id',
    loadComponent: () => import('./features/my-articles/my-article-detail/my-article-detail').then(m => m.MyArticleDetail)
  },
  
  {
    path: 'public-articles',
    loadComponent: () => import('./features/public-articles/public-article-list/public-article-list').then(m => m.PublicArticleList)
  },
  {
    path: 'public-articles/:id',
    loadComponent: () => import('./features/public-articles/public-article-detail/public-article-detail').then(m => m.PublicArticleDetail)
  },
  
  {
    path: '',
    redirectTo: 'my-articles',
    pathMatch: 'full'
  }
];
