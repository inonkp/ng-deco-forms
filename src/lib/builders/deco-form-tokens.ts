import { InjectionToken } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DecoFormNode } from "./deco-form-node";

export const FORM_FIELDS_TOKEN = new InjectionToken<DecoFormNode[]>('form-fields');
export const FIELD_FORM_CONTROL_TOKEN = new InjectionToken<FormControl | FormGroup>('field-form-control');
export const FIELD_PARENT_CONTROL_TOKEN = new InjectionToken<FormGroup>('field-parent-control');
export const FIELD_PROP_KEY_TOKEN = new InjectionToken<string>('field-prop-key');
export const FIELD_CHANGE_TRACKING_TOKEN = new InjectionToken<(value: any) => void>('field-change-tracking');
export const FORM_SUBMIT_TOKEN = new InjectionToken<() => void>('form-submit');
export const FIELD_CONFIG_TOKEN = new InjectionToken<any>('field-config');