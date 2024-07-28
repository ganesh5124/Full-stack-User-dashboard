import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot()
  ]
})
export class AppModule { }
