import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { forbiddenEmailValidator } from './forbidden-email.validator';

@Directive({
  selector: '[tecForbiddenEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ForbiddenEmailDirective,
    multi: true
  }]
})
export class ForbiddenEmailDirective implements Validator {
  @Input('forbiddenEmail') forbiddenEmail: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenEmail ? forbiddenEmailValidator(new RegExp(this.forbiddenEmail, 'i'))(control)
                              : null;
  }
}
