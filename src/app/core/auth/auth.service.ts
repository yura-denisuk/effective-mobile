import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public name: string = 'name';
  public email: string = 'email';
  public password: string = 'password';
  public isLogin: string = 'isLogin';
  public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLogged: boolean = false;

  //Метод установки информации о пользователе в localstorage
  public setUserInfo(name: string, email: string, password: string): void {
    localStorage.setItem(this.name, name);
    localStorage.setItem(this.email, email);
    localStorage.setItem(this.password, password);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  //Метод получения информации о пользователе из localstorage
  public getUserInfo(): {name: string | null, email: string | null, password: string | null} {
    return  {
      name: localStorage.getItem(this.name),
      email: localStorage.getItem(this.email),
      password: localStorage.getItem(this.password)
    }
  }

  //Метод получения имени пользователя из localstorage
  public getName(): null | string {
    return localStorage.getItem(this.name);
  }

  //Метод получения значения переменной isLogin из localstorage
  public getIsLogin(): null | string {
    return localStorage.getItem(this.isLogin);
  }

  //Метод выхода пользователя
  logout(): void {
    this.isLogged = false;
    this.isLogged$.next(false);
    localStorage.removeItem(this.isLogin);
    localStorage.setItem(this.isLogin, 'false');
  }

  //Метод входа пользователя
  login(): void {
    this.isLogged = true;
    this.isLogged$.next(true);
    localStorage.removeItem(this.isLogin);
    localStorage.setItem(this.isLogin, 'true');
  }
}
