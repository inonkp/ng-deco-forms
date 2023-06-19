import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DecoFormComponent } from './deco-form.component';
import { FieldComponent } from './core/field/field.component';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './core/group/group.component';
import { DecoFormDirective } from './deco-form.directive';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AutosizeModule } from 'ngx-autosize';
import { ErrorPipe } from './pipes/error.pipe';
import { DecoFieldDirective } from './directives/forms/deco-field.directive';
import { ChangeDirective } from './directives/change.directive';
import { SubmitDirective } from './directives/submit.directive';


@NgModule({
  declarations: [
    DecoFormComponent,
    FieldComponent,
    GroupComponent,
    DecoFormDirective,
    ErrorPipe,
    DecoFieldDirective,
    SubmitDirective,
    ChangeDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    AutosizeModule
  ],
  exports: [
    DecoFormComponent,
    GroupComponent,
    DecoFormDirective,
    ChangeDirective
  ],
})
export class DecoFormsLibModule {
 
}
