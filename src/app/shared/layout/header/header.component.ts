import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  isLogged: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
    //Получение актуального состояния авторизации пользователя при нахождении пользователя на странице
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })

    const isLogin = this.authService.getIsLogin();
    if (isLogin === 'true') {
      //Получение имени пользователя для установки в header
      this.getUserNameFromLocalStorage();
      this.isLogged = true;
    }
  }

  ngDoCheck() {
    //Получение имени пользователя для установки в header
    this.getUserNameFromLocalStorage();
  }

  //Функция выхода пользователя из системы
  doLogout(): void {
    this.authService.logout();
    this._snackBar.open('Вы успешно вышли из системы');
    this.router.navigate(['/login']);
  }

  getUserNameFromLocalStorage() {
    const name = this.authService.getName();
    if (name) {
      this.userName = name;
    }
  }
}
