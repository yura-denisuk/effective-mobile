import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllArticlesType} from "../../../types/all-articles.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<AllArticlesType[]> {
    return this.http.get<AllArticlesType[]>("https://jsonplaceholder.typicode.com/posts");
  }

  getArticleDetail(articleId: number): Observable<AllArticlesType> {
    return this.http.get<AllArticlesType>("https://jsonplaceholder.typicode.com/posts/" + articleId);
  }
}
