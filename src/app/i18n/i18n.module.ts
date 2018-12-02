import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [TranslatePipe],
  imports: [
    CommonModule
  ],
  providers: [TranslatePipe],
  exports: [TranslatePipe], 
})
export class I18nModule { }
