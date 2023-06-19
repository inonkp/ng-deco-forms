import { Directive, forwardRef, inject, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

export const FORM_SUBMIT_OBSERVABLE_TOKEN = new InjectionToken<Subject<void>>('form-submit-observable');
@Directive({
  selector: '[decoSubmit]',
  providers: [{ provide: FORM_SUBMIT_OBSERVABLE_TOKEN, useFactory: () => inject(SubmitDirective).submit}]
})
export class SubmitDirective implements OnDestroy {
  submit: Subject<void> = new Subject();
  constructor(private form: FormGroupDirective) {
    form.ngSubmit.subscribe(() => {
      this.submit.next();
    })
 }


  ngOnDestroy(): void {
    this.submit.complete();
  }
}
