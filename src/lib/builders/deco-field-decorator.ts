import 'reflect-metadata';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FactoryProvider, inject, InjectionToken, StaticProvider, ValueProvider, Inject } from '@angular/core';
import { GroupComponent } from '../core/group/group.component';
import { DecoFormField, DecoFormGroup, DecoFormKeyedNode, DecoFormNode, DecoFormTarget } from './deco-form-node';
import { fieldPrefix, getFormField, getFormTargetNode, getNode, getTargetToken } from './utils';
import { Config, Field, FieldWrapper, Target } from './deco-forms-types';
import { FIELD_CHANGE_TRACKING_TOKEN } from './deco-form-tokens';

export function chain(funcs: ((target: any, key: string) => any | void)[]) {
    return (target: any, key: string) => {
        if(funcs.length == 0) return;
        chain(funcs.slice(0, funcs.length - 1))(target, key);
        funcs[funcs.length - 1](target, key);
    }

}

export function Class(className: string) {
    return function(target: any, propertyKey: string = "deco-target") {
        const field = getNode(target, propertyKey);

        if(field.wrappers.length > 0) {
            field.wrappers[field.wrappers.length - 1].classes.push(className);
            return;
        }
        field.classes.push(className);
    }
}

export function Wrap(wrapper: any) {

    return function(target: any, propertyKey: string = "deco-target") {
        const field = getNode(target, propertyKey);
        field.addWrapper(wrapper);
    }
}

export function addValidator(validator: ValidatorFn) {
    return function(target: any, key: string) {
        getFormField(target, key).validators.push(validator);
    }
}

export function DecoField(type: any, props: Object = {}) {
    const token = getTargetToken(type);
    return function(target: any, key: string) {
        const field = new DecoFormField(key, type);
        field.providers = [Props(type, props)];
        field.wrappers = [];     
        Reflect.defineMetadata(fieldPrefix + key, field, target)
    }
}

export function Props<T extends Object>(target: Target<T>, props: Partial<Config<T>>): FactoryProvider {
    const token: InjectionToken<T> = getTargetToken(target); 
    return {
        provide: token,
        useFactory: () => {
            return {
                ...props,
                ...inject(token, {skipSelf: true, optional: true}) ?? {}
            };
        }
    }
}

function factoryProvider<T extends Object>(token: InjectionToken<T>, prop: keyof T, factoryFunc: () => T[typeof prop]): FactoryProvider {
    return {
        provide: token,
        useFactory: () => {
            var obj: any = {}
            obj[prop] = factoryFunc();
            return {
                ...obj,
                ...inject(token, {skipSelf: true, optional: true}) ?? {}
            };
        }
    }
}



export function Provide(provider: StaticProvider) {
     return function (target: any, propertyKey: string = "deco-target") {

        const field = getNode(target, propertyKey);
        if(field.wrappers.length > 0) {
            field.wrappers[field.wrappers.length - 1].providers.push(provider)
            return;
        }
        field.providers.push(provider);
    }
}

export function PropFactory<T>(target: Target<T>, key: keyof Config<T>, prop: () => Config<T>[typeof key] ) {

    return Provide(factoryProvider(getTargetToken(target), key, prop));
}

export function Prop<T>(target: Target<T>, key: keyof Config<T>, prop: Config<T>[typeof key] ) {

    return Provide(factoryProvider(getTargetToken(target), key, () => prop));
}

export function Group(type: any = GroupComponent) {
    return function<T>(target: T, key: string) {
        const group = new DecoFormGroup(key, type, target)

        group.classes.push(fieldPrefix + 'group');
        Reflect.defineMetadata(`${fieldPrefix}${key}`, group, target)
    }
}

export function rootFactory<T>(root: any, props: Partial<T> = {}) {
    return function (target: any) {

        const token = getTargetToken(root);
        const rootNode = new DecoFormTarget(root)
        rootNode.providers = [Props(root, props)];
        Reflect.defineMetadata('deco-target', rootNode, target)
    }
}

export const Listen = (func: () => ((value: any) => void)) => Provide({provide: FIELD_CHANGE_TRACKING_TOKEN, useFactory: func});
export const Validator = (validator: ValidatorFn) => addValidator(validator)
export const Form = (root: any) => rootFactory(root);

export const targetConfig = getTargetToken
