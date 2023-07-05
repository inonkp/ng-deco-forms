import { FormGroup } from '@angular/forms';
import { DecoFormKeyedNode, DecoFormNode, DecoFormTarget } from './deco-form-node';
import { InjectionToken } from "@angular/core";

export const fieldPrefix = 'deco-field-';

export function collectFields(target: any): DecoFormKeyedNode[]{
    try {
        return Reflect.getMetadataKeys(target).
            filter(val => val.startsWith(fieldPrefix)).
            map(val => Reflect.getMetadata(val, target));
    } catch (error) {
        return [];
    }
  }

export function initTargetFormGroup(target: any, parentNode: DecoFormKeyedNode = null) {
    const fields = collectFields(target);
    if(fields.length === 0) {
        parentNode.initControl();
        parentNode.control.setValue(target);
        return null;
    }
    const formGroup = parentNode?.control as FormGroup ?? new FormGroup({});
    fields.forEach(field => {
        field.initControl();
        initTargetFormGroup(target[field.key], field);
        formGroup.addControl(field.key, field.control);
    });
    return formGroup;
}

export function getFormTargetNode(target: any) {
    let t = Reflect.getMetadata('deco-target', target);
    return t;
}

export function getFormRoot(target: any): DecoFormTarget {
    return getFormTargetNode(target);
}



export function getTargetToken(target: any, subToken: string = "config") {
    const tokenName = target.name + "-" + subToken + '-token';
    if(Reflect.hasMetadata(tokenName, target) === false) {
        const token = new InjectionToken<any>(tokenName);
        Reflect.defineMetadata(tokenName, token, target);
    };
    let t = Reflect.getMetadata(tokenName, target);
    return t;
}   

export function getFormTarget(target: any): DecoFormTarget {
    let t = getFormTargetNode(target);
    if(!t) {
        t = new DecoFormTarget(target);
        Reflect.defineMetadata('deco-target', t, target);
    }
    return t;
}

export function getNode(target: any, key: string): DecoFormTarget {
    if( key != "deco-target") {
        return getFormField(target, key);
    }
    const t = getFormTarget(target);
    return t;
}

export function getFormField(target: any, key: string): DecoFormKeyedNode {
    const field = Reflect.getMetadata(fieldPrefix + key, target);
    return field; 
}
