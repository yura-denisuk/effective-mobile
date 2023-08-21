import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {AllArticlesType} from "../../../types/all-articles.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  articles: AllArticlesType[] = [];
  isLogged: boolean = false;

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar,) {

  }

  ngOnInit() {
    const isLogin = this.authService.getIsLogin();
    if (isLogin === 'true') {
      this.articleService.getArticles()
        .subscribe({
          next: (data: AllArticlesType[]) => {
            if (data && data.length > 0) {
              this.articles = data;
            } else {
              this._snackBar.open('Ошибка запроса на получение статей!');
            }
          }
        })
    } else {
      this.router.navigate(['/login']);
    }


    //Получение актуального состояния авторизации пользователя при нахождении пользователя на странице
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })
  }
}
