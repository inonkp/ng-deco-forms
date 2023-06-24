import { ApplicationRef, ChangeDetectionStrategy, Component, EnvironmentInjector, Inject, InjectionToken, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DecoFormKeyedNode, DecoFormNode } from '../../builders/deco-form-node';
import { FIELD_FORM_CONTROL_TOKEN, FORM_FIELDS_TOKEN } from '../../builders/deco-form-tokens';

@Component({
  selector: 'deco-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent {
  @ViewChild('content', {static: true, read: ViewContainerRef})
  viewRef: ViewContainerRef;

  constructor(@Inject(FORM_FIELDS_TOKEN) public fields: DecoFormKeyedNode[],
    @Inject(FIELD_FORM_CONTROL_TOKEN) public group: FormGroup) {

    }

}
