import { Directive, Inject, InjectionToken, Input, forwardRef, inject } from '@angular/core';
import { FIELD_FORM_CONTROL_TOKEN, FORM_TARGET_TOKEN } from '../builders/deco-form-tokens';
import { DecoFormComponent, ROOT_FORM_GROUP_TOKEN } from '../deco-form.component';
import { initTargetFormGroup } from '../builders/utils';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[eagerly]',
  providers: [
    {
      provide: ROOT_FORM_GROUP_TOKEN, useFactory:
       () => initTargetFormGroup(inject(FORM_TARGET_TOKEN))
    }
  ]
})
export class EagerlyDirective {

}
