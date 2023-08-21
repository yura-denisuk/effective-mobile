import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {ArticleComponent} from "./views/article/article.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {path: '', component: MainComponent},
      {path: 'articles/:url', component: ArticleComponent},
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
