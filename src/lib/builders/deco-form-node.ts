import { FormControl, FormGroup, ValidatorFn, AsyncValidatorFn, AsyncValidator } from "@angular/forms";
import { InjectionToken, StaticProvider } from "@angular/core";
import { getTargetToken } from "./utils";

export class DecoFormNode {
    providers: StaticProvider[] = [];
    classes: string[] = [];
    constructor() {
    }

}


export class DecoFormTarget extends DecoFormNode {
    wrappers: DecoFormTarget[] = [];

    constructor(public type: any) {
        super();
    }
    addWrapper(wrapper:any) {
        this.wrappers.push(new DecoFormTarget(wrapper));
    }
}

export abstract class DecoFormKeyedNode extends DecoFormTarget{

    get token() {
        return getTargetToken(this.type);
    }
    control: FormControl | FormGroup;
    validators: ValidatorFn[] = []
    constructor(public key: string, public type: any) {
        super(type);
    }

    abstract initControl(): void;

}

export class DecoFormGroup extends DecoFormKeyedNode {

    constructor(key: string, type: any, public classTarget: any) {
        super(key, type);
    }

    initControl() {
        this.control = new FormGroup({}, this.validators);
    }

}

export class DecoFormField extends DecoFormKeyedNode {

    constructor(key: string, type: any) {
        super(key, type);
    }

    initControl() {
        this.control = new FormControl(null, this.validators);
    }   
}
