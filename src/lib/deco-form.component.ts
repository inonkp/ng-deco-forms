import { ChangeDetectionStrategy, Component, ComponentRef, ContentChild, EventEmitter, forwardRef, Inject, inject, InjectionToken, Injector, Input, Optional, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { FieldComponent } from './core/field/field.component';
import { DecoFormDirective } from './deco-form.directive';
import { DecoFormNode } from './builders/deco-form-node';
import { FORM_TARGET_TOKEN } from './builders/deco-form-tokens';

export const ROOT_FORM_GROUP_TOKEN = new InjectionToken<FormGroup>('root-form-group');

@Component({
  selector: 'ng-deco-form',
  templateUrl: './deco-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecoFormComponent {

  @ViewChild(DecoFormDirective, { static: true })
  formDirective: DecoFormDirective;

  @ViewChild('content', { static: true, read: ViewContainerRef })
  content: ViewContainerRef;
  
  @ViewChild('f', { static: true})
  ngForm: NgForm;

  @Input('form-target')
  formTarget: any;

  fields: DecoFormNode[];
  formGroup: FormGroup;

  constructor(@Optional() @Inject(ROOT_FORM_GROUP_TOKEN) private rootFormGroup: FormGroup,
    @Inject(FORM_TARGET_TOKEN) target: any) {
    this.formTarget = target;
    this.formGroup = rootFormGroup ?? new FormGroup({});
  }



  ngOnInit() {

  }
  
}
