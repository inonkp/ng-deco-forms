import { ChangeDetectionStrategy, Component, ComponentRef, ContentChild, EventEmitter, forwardRef, Inject, inject, Injector, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { FieldComponent } from './core/field/field.component';
import { DecoFormDirective } from './deco-form.directive';
import { DecoFormNode } from './builders/deco-form-node';


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
  
  @ViewChild('ngForm', { static: true})
  ngForm: NgForm;

  @Input('form-target')
  formTarget: any;

  fields: DecoFormNode[];
  formGroup: FormGroup;


  constructor() {
    this.formGroup = new FormGroup({});
  }



  ngOnInit() {

  }
  
}
