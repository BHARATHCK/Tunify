import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { ReadableArticleComponent } from './readable-article/readable-article.component';

const routes: Routes = [
  {path: '' , component: LayoutComponent},
  {path: 'postArticle' , component: BlogComponent},
  {path: 'dashboard' , component: DashboardComponent},
  {path: 'blog' , component: UserBlogComponent},
  {path: 'blog/:id' , component: ReadableArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
