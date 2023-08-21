import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {
    const isLogin = this.authService.getIsLogin();
    if (isLogin === 'true') {
      this.router.navigate(['/']);
    }
  }

  login(): void {
      if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
        const userInfo = this.authService.getUserInfo();
        if (this.loginForm.value.email === userInfo.email && this.loginForm.value.password === userInfo.password) {
          this.authService.login();
          this._snackBar.open('Вы вошли на сайт');
          this.router.navigate(['/']);
        } else {
          this._snackBar.open('Вам необходимо зарегистрироваться на сайте');
        }
      }
  }
}
