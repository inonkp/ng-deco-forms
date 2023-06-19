import 'reflect-metadata';
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

export function getFormTargetNode(target: any) {
    let t = Reflect.getMetadata('deco-target', target);
    return t;
}

export function getFormRoot(target: any): DecoFormTarget {
    return getFormTargetNode(target);
}



export function getTargetToken(target: any) {
    if(Reflect.hasMetadata(target.name + '-token', target) === false) {
        const token = new InjectionToken<any>(target + "-token");
        Reflect.defineMetadata(target.name + '-token', token, target);
    };
    let t = Reflect.getMetadata(target.name + "-token", target);
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
    return getFormTarget(target);
}

export function getFormField(target: any, key: string): DecoFormKeyedNode {
    const field = Reflect.getMetadata(fieldPrefix + key, target);
    return field; 
}
