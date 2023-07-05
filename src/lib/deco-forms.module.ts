import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DecoFormComponent } from './deco-form.component';
import { FieldComponent } from './core/field/field.component';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './core/group/group.component';
import { DecoFormDirective } from './deco-form.directive';
import { ErrorPipe } from './pipes/error.pipe';
import { DecoFieldDirective } from './directives/forms/deco-field.directive';
import { ChangeDirective } from './directives/change.directive';
import { SubmitDirective } from './directives/submit.directive';
import { TargetGroupPipe } from './pipes/target-group.pipe';
import { EagerlyDirective } from './directives/eagerly.directive';

@NgModule({
  declarations: [
    DecoFormComponent,
    FieldComponent,
    GroupComponent,
    DecoFormDirective,
    ErrorPipe,
    DecoFieldDirective,
    SubmitDirective,
    ChangeDirective,
    TargetGroupPipe,
    EagerlyDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DecoFormComponent,
    GroupComponent,
    DecoFormDirective,
    DecoFieldDirective,
    ChangeDirective,
    TargetGroupPipe,
    EagerlyDirective
  ],
})
export class DecoFormsLibModule {
 
}
