import { Pipe, PipeTransform } from '@angular/core';
import { initTargetFormGroup } from '../builders/utils';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'targetGroup'
})
export class TargetGroupPipe implements PipeTransform {

  transform(target: any): FormGroup {
    return initTargetFormGroup(target);
  }

}
