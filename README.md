
# Angular Decorated Forms

A forms library for Angular. Relying heavily on Angular's dependency injection mechanism makes this library incredibly flexible. Form fields are entirely described via Typescript decorators, making forms easier to maintain. Loosely inspired by Formly.


## Basic Examples

### Field Examples

#### Text Input

```typescript

export class TextTypeComponent {

  constructor(@Inject(FIELD_FORM_CONTROL_TOKEN) public control: FormControl) {

    
  }
    
  
}
```

```HTML
<input
  class="deco-text"
  type="text"
  [formControl]="control"
>

```

#### Number Input

```typescript

export class NumberTypeComponent {

  
  constructor(@Inject(FIELD_FORM_CONTROL_TOKEN) public control: FormControl,
    @Optional() @Inject(FIELD_CONFIG_TOKEN) public config: NumberFieldConfig) {

  }
}

```

```HTML
<input
  class="deco-number"
  type="number"
  [formControl]="control"
  [step]="config.step"
  [min]="config.min"
  [max]="config.max"
>

```
#### Label Wrapper
```typescript
export class FieldLabelWrapperComponent {

  constructor(
    @Optional() @Inject(FIELD_CONFIG_TOKEN) public config: LabelConfig
  ) {

  }
}
```
```HTML
<div class="deco-field-label">
  <div class="deco-field-label__label">
    <label
      *ngIf="config.label"
      class="deco-field-label__text"
    >{{ config.label }}</label>
  </div>

  <div class="deco-field-label__field" decoWarning>
    <ng-content></ng-content>
  </div>
</div>

```

## Simple Usage

Create a field:

```typescript

export const Text = () => DecoField(TextTypeComponent)

```
Or with config:

```typescript

export const Number = (props?: NumberFieldConfig) => DecoField(NumberTypeComponent, props)

```

Create a form:

```typescript

@Form(SubmitComponent)
class DemoForm {

    @Text()
    my_text = "Bla Bla"

    @Number({step: 2})
    my_number = 1
}

```

Render your form:

```typescript

const demo = new DemoForm()

```

```HTML

<deco-form [form-target]="demo"></deco-form>

```

### Add Wrappers

Create a wrapper:


```typescript

const LabelWrap = Wrap(FieldLabelWrapperComponent)

```

Use it:

```typescript

@Form(SubmitComponent)
class DemoForm {

    LabelWrap()
    @Text()
    my_text = "Bla Bla"

    LabelWrap()
    @Number({step: 2})
    my_number = 1
}

```

### Add Properties

#### Single Properties

```typescript

const Label = (label: string) Prop(FieldLabelWrapperComponent, 'label', label)

```

Use it:

```typescript

@Form(SubmitComponent)
class DemoForm {

    @Label('Text')
    @LabelWrap()
    @Text()
    my_text = "Bla Bla"

    @Label('Number')
    @LabelWrap()
    @Number({step: 2})
    my_number = 1
}

```

#### Multiple Properties


```typescript

const NumberProps = (config: NumberFieldConfig) => Props(NumberTypeComponent, config)

```

Use it:

```typescript

@Form(SubmitComponent)
class DemoForm {

    @Label('Text')
    @LabelWrap()
    @Text()
    my_text = "Bla Bla"

    @Label('Number')
    @LabelWrap()
    @NumberProps({min:1, max: 10})
    @Number({step: 2})
    my_number = 1
}

```

### Add CSS Classes

```typescript

@Class('form-class')
@Form(SubmitComponent)
class DemoForm {

    @Class('text-class')
    @Text()
    my_text = "Bla Bla"

}

```

### Add Providers

```typescript

@Form(SubmitComponent)
class DemoForm {

    @Provide({provide: MAX_LENGTH_TOKEN, useValue: 50})
    @Text()
    my_text = "Bla Bla"

}

```

And in TextTypeComponent

```typescript

export class TextTypeComponent {

  constructor(@Inject(MAX_LENGTH_TOKEN) public maxLength: Number) {

    
  }
    
  
}

```

### Chaining Decorators

```typescript

const LabelWrap = export const Label = (label: string) => chain([
    Wrap(FieldLabelWrapperComponent), 
    Prop(FieldLabelWrapperComponent,'label', label)
])

```

```typescript

@Form(SubmitComponent)
class DemoForm {

    @LabelWrap('Label')
    @Text()
    my_text = "Bla Bla"

}

```
## Usage Details

### Form Controls

Deco Forms uses Reactive Forms as its primary source of control.

### Typing

Decorators Prop and Props are type sensitive. If you component can be configured, add a field called config.


```typescript

export class NumberTypeComponent {

  
  constructor(@Inject(FIELD_FORM_CONTROL_TOKEN) public control: FormControl,
    @Optional() @Inject(FIELD_CONFIG_TOKEN) public config: NumberFieldConfig) {

  }
}

```
### Decorator Order

Decorator order is important. Props, Prop, Class and Providers will apply on the last component, be it a field or a wrapper.
## API

### Decorators

#### Form

Decorate classes with @Form to enable deco forms to render it. Receives a root component to render the form.

#### DecoField

Use @DecoField(Component) on a class memeber to render render it using Component. Its initial value will be the value given to it initially.

#### Group
Use @Group on class members to render that class. You must initialize this member in order to be rendered.

#### Wrap
Use Wrap(Component) to wrap fields with Component. Wrapper components should use ng-content. Please see examples of this in the usage section.

#### Class
Assigns CSS classes to the last component in the decorator chain.

#### Provide
Assign providers to be injected into components. These will be added to the last components in the decorator chain.

#### Listen
Receives a factory function that returns a function, which listen to form control changes. Can decorate groups as well.

### Components

#### Form

To create a new form:

```HTML

<deco-form [form-target]="form"></deco-form>

```

Where "form" is a class annotated with @Form

#### Group
To create a new group within a form tree:

```HTML

<deco-group></deco-group>

```

### Directives

#### Form Directive
If you know what your doing you can render the form without DecoFormComponent with:

```HTML

    <ng-container [deco-form]="formTarget"></ng-container>

```

#### Field Directive
You can render fields with:

```HTML

    <ng-container [deco-field]="formTarget"></ng-container>

```


### Tokens

The library supplies some tokens to be used:

FORM_FIELDS_TOKEN - gives you access to the fields in a custom Group.

FIELD_FORM_CONTROL_TOKEN - gives you the form control of a field.

FIELD_PARENT_CONTROL_TOKEN - gives you the parent control of a field.

FIELD_PROP_KEY_TOKEN - gives the name of the field form control.

FIELD_CONFIG_TOKEN - the config of a field.

FIELD_CHANGE_TRACKING_TOKEN - Use this to provide a function that will trigger on field changes.

FORM_SUBMIT_TOKEN - Controls what happensn when a form submits.