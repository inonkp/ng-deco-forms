import { ApplicationRef, Component, ComponentRef, createComponent, Directive, EnvironmentInjector, Inject, InjectionToken, Injector, Input, StaticProvider, ViewContainerRef } from '@angular/core';
import { FormGroup, FormGroupDirective} from '@angular/forms';
import { DecoFormKeyedNode, DecoFormNode, DecoFormTarget } from '../../builders/deco-form-node';
import { FIELD_CONFIG_TOKEN, FIELD_FORM_CONTROL_TOKEN, FIELD_PARENT_CONTROL_TOKEN, FIELD_PROP_KEY_TOKEN, FORM_FIELDS_TOKEN, FORM_TARGET_TOKEN } from '../../builders/deco-form-tokens';
import { collectFields, getFormTargetNode, getTargetToken } from '../../builders/utils';
import { FieldComponent } from '../../core/field/field.component';

interface FormTarget {
  constructor?: any;
}

@Directive({
  selector: '[deco-field]'
})
export class DecoFieldDirective {

  @Input('deco-field') 
  set decoField(field: DecoFormKeyedNode) {
    this.renderField(field);
  } 

  constructor(
    @Inject(FORM_TARGET_TOKEN) private target: FormTarget,
    @Inject(FIELD_FORM_CONTROL_TOKEN) private parentControl: FormGroup,
    private viewRef: ViewContainerRef, 
    private injector: Injector, 
    private envInjector: EnvironmentInjector,
    private appRef: ApplicationRef) { }

  private createInjector(providers: StaticProvider[], parent: Injector) {
    let injector = parent;
    providers.forEach(provider => {
      injector = Injector.create({
        providers: [provider],
        parent: injector
      })
    });
    return injector;
  }

  wrapContent(field: DecoFormKeyedNode, component: ComponentRef<any>, parentInjector: Injector,
     wrapperIndex: number = field.wrappers.length - 1) {
    const wrappers = field.wrappers;
    if(wrapperIndex < 0) {
      const fieldInjector = this.createInjector(field.providers, parentInjector);
        component = this.createComponent(field.type,
          [[]],
          fieldInjector
        )
        this.appRef.attachView(component.hostView);
  
        component.location.nativeElement.classList.add(...field.classes);
        return component;
    }

    const wrapperInjector = this.createInjector(wrappers[wrapperIndex].providers, parentInjector);
    component = this.wrapContent(field, component, wrapperInjector, wrapperIndex - 1);

    component = this.createWrapper(wrappers[wrapperIndex], component, wrapperInjector);
    return component;
  }

  createWrapper(wrapper: DecoFormTarget, componentContent: any, injector: Injector ): ComponentRef<any> {
    const component = this.createComponent(wrapper.type, [[componentContent.location.nativeElement]], injector);  
    component.location.nativeElement.classList.add(...wrapper.classes);

    this.appRef.attachView(component.hostView);
    return component;
  }

  createDecoField(field: DecoFormNode, componentContent: any, injector: Injector) {
    
    const fieldComponent = this.createComponent(FieldComponent, [[componentContent.location.nativeElement]], injector);
    this.viewRef.insert(fieldComponent.hostView);
  }

  createComponent(type: any, content: Node[][], injector: Injector): ComponentRef<any> {
    injector = Injector.create({
      providers: [
        { provide: FIELD_CONFIG_TOKEN, useExisting: getTargetToken(type) }
      ],
      parent: injector
    })
    let component = createComponent(type, 
      {
        elementInjector: injector, 
        environmentInjector: this.envInjector, 
        projectableNodes: content
      }
    )

    component.changeDetectorRef.detectChanges();

    return component;
  }

  processTarget(field: DecoFormKeyedNode, target: any) {
    const targetNode = getFormTargetNode(target);
    if(targetNode) {
      field.classes = field.classes.concat(targetNode.classes);
      field.providers = field.providers.concat(targetNode.providers);
      field.wrappers = field.wrappers.concat(targetNode.wrappers);
    }
  }

  renderField(field: DecoFormKeyedNode) {
    let component = null;
    const target = this.target[field.key];

    const fields = collectFields(target);
    if(target?.constructor) {
      this.processTarget(field, target.constructor);
    }
    if(!this.parentControl.contains(field.key)) {
      field.initControl()
      this.parentControl.addControl(field.key, field.control);
      
      if(fields.length === 0) {
        field.control.setValue(target);
      }
    }
    const targetInjector = Injector.create({
      providers: [
        { provide: FORM_TARGET_TOKEN, useValue: target },
        { provide: FORM_FIELDS_TOKEN, useValue: fields },
        {
          provide: FIELD_FORM_CONTROL_TOKEN,
          useValue: field.control
        },
        {
          provide: FIELD_PROP_KEY_TOKEN,
          useValue: field.key
        },
        {
          provide: FIELD_PARENT_CONTROL_TOKEN,
          useValue: field.control.parent
        }
      ],
      parent: this.injector
    })
    
    const wrapped = this.wrapContent(field, component, targetInjector);
    this.createDecoField(field, wrapped, targetInjector);

  }
}
