import { ApplicationRef, ChangeDetectorRef, ComponentRef, createComponent, Directive, EnvironmentInjector, forwardRef, Inject, Optional, inject, Injector, Input, Provider, StaticProvider, ViewContainerRef } from '@angular/core';
import { GroupComponent } from './core/group/group.component';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FORM_TARGET_TOKEN } from './directives/forms/deco-field.directive';
import { FIELD_CONFIG_TOKEN, FIELD_FORM_CONTROL_TOKEN, FORM_FIELDS_TOKEN, FORM_SUBMIT_TOKEN } from './builders/deco-form-tokens';
import { collectFields, getFormRoot, getTargetToken } from './builders/utils';
import { FORM_SUBMIT_OBSERVABLE_TOKEN } from './directives/submit.directive';
import { Observable } from 'rxjs';
@Directive({
  selector: '[deco-form]',
  exportAs: 'decoForm'
})
export class DecoFormDirective {

  @Input('deco-form') decoForm: any;

  entity: string= "";
  formGroup: FormGroup;
  constructor(private viweRef: ViewContainerRef, private injector: Injector, @Optional() @Inject(FORM_SUBMIT_OBSERVABLE_TOKEN) private submit$: Observable<void>,
     private envInjector: EnvironmentInjector, private formGroupDir: FormGroupDirective) {
  }

  ngOnInit() {
    this.formGroup = this.formGroupDir.control;
    const root = getFormRoot(this.decoForm.constructor);
    if(!root) {
      throw new Error('No root component found. Please use Form decorator.');
    }
    let injector = Injector.create({
      providers: [
        { provide: FORM_FIELDS_TOKEN, useValue: collectFields(this.decoForm) },
        { provide: FORM_TARGET_TOKEN, useValue: this.decoForm },
        { provide: FIELD_FORM_CONTROL_TOKEN, useValue: this.formGroup}
      ],
      parent: this.injector
    });

    root.providers.forEach(provider => 
      injector = Injector.create({
        providers: [provider],
        parent: injector
    }));

    injector = Injector.create({
      providers: [{provide: FIELD_CONFIG_TOKEN, useExisting: getTargetToken(root.type)}],
      parent: injector
    })

    this.viweRef.createComponent(root.type,{
      injector: injector, 
      environmentInjector: this.envInjector,
      projectableNodes: [[]],
    });

    const submitter = injector.get(FORM_SUBMIT_TOKEN, null);

    this.submit$?.subscribe(() => {
      submitter?.()
    });
  }

}
