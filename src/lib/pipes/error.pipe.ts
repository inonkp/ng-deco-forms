import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(value: ValidationErrors, ...args: unknown[]): string {
    if(!value) return '';
    if(value.required) return 'This field is required';
    if(value.minlength) return `This field must be at least ${value.minlength.requiredLength} characters long`;
    if(value.maxlength) return `This field must be at most ${value.maxlength.requiredLength} characters long`;
    if(value.min) return `This field must be at least ${value.min.min}`;
    if(value.max) return `This field must be at most ${value.max.max}`;
    if(value.email) return `This field must be a valid email address`;
    const keys = Object.keys(value);
    return value[keys[0]];
      
      
    
  }

}
