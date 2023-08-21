import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
    const isLogin = this.authService.getIsLogin();
    if (isLogin === 'true') {
      this.router.navigate(['/']);
    }
  }

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^(?:[А-ЯЁ][а-яё]*\\s*)*')]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
  });

  signup() {
    if (this.signupForm.valid && this.signupForm.value.email
      && this.signupForm.value.password && this.signupForm.value.firstName) {
      this.authService.setUserInfo(this.signupForm.value.firstName, this.signupForm.value.email, this.signupForm.value.password);
      this.authService.login();
      this._snackBar.open('Вы успешно зарегистрировались');
      this.router.navigate(['/']);
    }
  }
}
