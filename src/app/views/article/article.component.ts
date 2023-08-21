import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {AllArticlesType} from "../../../types/all-articles.type";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  currentArticle: AllArticlesType = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  }

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,) {
  }

  ngOnInit() {
    const isLogin = this.authService.getIsLogin();
    if (isLogin === 'true') {
      this.activatedRoute.params.subscribe(params => {
        this.articleService.getArticleDetail(params['url'])
          .subscribe({
            next: (data: AllArticlesType) => {
              if (data) {
                this.currentArticle = data;
              } else {
                this._snackBar.open('Сервер временно не доступен!');
              }
            }
          })
      })
    } else {
      this.router.navigate(['/login']);
    }
  }
}
