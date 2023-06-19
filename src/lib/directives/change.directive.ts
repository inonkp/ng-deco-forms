import { Directive, Inject, OnDestroy, Optional } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControlDirective, FormGroupDirective, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FIELD_CHANGE_TRACKING_TOKEN, FIELD_FORM_CONTROL_TOKEN } from '../builders/deco-form-tokens';

@Directive({
  selector: '[formGroup],[formControl],[formArray]'
})
export class ChangeDirective implements OnDestroy{
  subscription: Subscription;
  constructor(@Optional() @Inject(FIELD_FORM_CONTROL_TOKEN) control: AbstractControl,
      @Optional() @Inject(FIELD_CHANGE_TRACKING_TOKEN) changeTracking: (value: any) => void) {

    this.subscription = control?.valueChanges?.subscribe(
      (value) => {
        if(!changeTracking) return;
        changeTracking(value)
      }
    );
   }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
