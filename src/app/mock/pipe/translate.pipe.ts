import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'translate'})
export class TranslatePipeSub implements PipeTransform {
  transform(value) {
    return value;
  }
}