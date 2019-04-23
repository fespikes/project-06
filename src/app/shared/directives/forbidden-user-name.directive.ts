import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidatorFn } from '@angular/forms';

import { TranslateService } from '../../i18n';
import { patterns } from '../patterns';

const errorMsgs = {
  letterAndNumber: 'COMMON.USERNAME_ONLY_LETTER_AND_NUMBER',
  firstLetter: 'COMMON.USERNAME_INVALID_FIRST_LETTER',
};

@Directive({
  selector: '[tecForbiddenUserName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenUsernameDirective,
      multi: true,
    },
  ],
})
export class ForbiddenUsernameDirective implements Validator {

  constructor(
    private translate: TranslateService,
  ) { }

  validate(control: AbstractControl): {[validator: string]: string | boolean} {
    if (!control.value) {
      return null;
    }

    const errors = [];
    ['letterAndNumber', 'firstLetter'].forEach((key) => {
      if (!patterns[key].test(control.value)) {
        errors.push(this.translate.translateKey(errorMsgs[key]));
      }
    });

    if (errors.length > 0) {
      return { forbiddenUserName: errors.join(', ')};
    } else {
      return null;
    }
  }
}
