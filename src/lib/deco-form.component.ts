import { ChangeDetectionStrategy, Component, ComponentRef, ContentChild, EventEmitter, forwardRef, Inject, inject, Injector, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { FieldComponent } from './core/field/field.component';
import { EntityServices } from '@ngrx/data';
import { DecoFormDirective } from './deco-form.directive';
import { DecoFormNode } from './builders/deco-form-node';


@Component({
  selector: 'deco-form',
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
  @Input() model: any;

  @Output() modelChange = new EventEmitter<any>();

  constructor() {
    this.formGroup = new FormGroup({});
  }
  public onModelChange(madel: any): void {
    this.modelChange.emit(madel);
  }


  ngOnInit() {

  }
  
}
