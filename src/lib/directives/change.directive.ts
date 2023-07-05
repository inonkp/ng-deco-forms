import { Directive, Inject, OnDestroy, Optional, inject } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControlDirective, FormGroupDirective, NgControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { FIELD_CHANGE_TRACKING_TOKEN, FIELD_FORM_CONTROL_TOKEN, FIELD_PUSH_VLAUE_TOKEN, FORM_TARGET_TOKEN } from '../builders/deco-form-tokens';
import { getTargetToken } from '../builders/utils';

@Directive({
  selector: '[formGroup],[formControl],[formArray]',
  providers: [
    {
      provide: FIELD_CHANGE_TRACKING_TOKEN,
      useFactory: () => {
        const target = inject(FORM_TARGET_TOKEN, {optional: true});
        if(!target) return null;
        try {
          return inject(getTargetToken(target.constructor, 'listener'), {optional: true})
        }catch(e) {
          return null;
        }
      }
    },
    {
      provide: FIELD_PUSH_VLAUE_TOKEN,
      useFactory: () => {
        const target = inject(FORM_TARGET_TOKEN, {optional: true});
        if(!target) return null;
        try {
          return inject(getTargetToken(target.constructor, 'pusher'), {optional: true})
        }catch(e) {
          return null;
        }
      }
    }
  ]
})
export class ChangeDirective implements OnDestroy{
  listen: Subscription;
  push: Subscription;
  constructor(@Optional() @Inject(FIELD_FORM_CONTROL_TOKEN) private control: AbstractControl,
      @Inject(FIELD_CHANGE_TRACKING_TOKEN) private changeTracking: Subject<any>,
      @Inject(FIELD_PUSH_VLAUE_TOKEN) private pusher$: Observable<any>) {

      }
      
      ngOnInit() {
        this.listen = this.control?.valueChanges?.subscribe(
          (value) => {
            if(!this.changeTracking) return;
            this.changeTracking.next(value);
          }
        );
    
        this.push = this.pusher$?.subscribe(
          (value) => {
            this.control?.setValue(value);
          }
        );
        
      }
      
  ngOnDestroy() {
    this.listen?.unsubscribe();
    this.push?.unsubscribe();
  }

}
