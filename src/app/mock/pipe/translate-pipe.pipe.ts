import {Pipe, PipeTransform} from '@angular/core';
import { of } from 'rxjs';

@Pipe({name: 'translate'})
export class TranslatePipeStub implements PipeTransform {
  transform(value) {
    return of(value);
  }
}
