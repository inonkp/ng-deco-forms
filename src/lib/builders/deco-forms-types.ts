import { InjectionToken, StaticProvider } from "@angular/core";

export type Field<T> = {
    name: string;
    token: InjectionToken<T>;
    target: any;
}

export type FieldWrapper<T> = {
    name: string;
    token: InjectionToken<T>;
    target: any;
}

export type DataEntity = {
    id: string | null,
    name: string
}

export type DataParentEntity = DataEntity & {
    children: DataParentEntity[]
}

export interface Configure<T> {
    config?: T
}

export type Target<T> = new (...args: any[]) => T;
export type Config<T> = T extends Configure<infer U> ? U : never