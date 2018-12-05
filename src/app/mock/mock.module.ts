import { NgModule } from '@angular/core';

import { TranslatePipeSub } from './pipe';

@NgModule({
  declarations: [
    TranslatePipeSub
  ],
  exports: [
    TranslatePipeSub,
  ]
})
export class MockModule { }
