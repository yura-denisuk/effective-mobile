import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import {DescriptionPipe} from "./pipes/description.pipe";
import { TitlePipe } from './pipes/title.pipe';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ArticleCardComponent,
    DescriptionPipe,
    TitlePipe,
  ],
  exports: [
    ArticleCardComponent,
    DescriptionPipe,
    TitlePipe,
    ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
  ]
})
export class SharedModule { }
