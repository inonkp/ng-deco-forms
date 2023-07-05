import { ChangeDetectionStrategy, Component, ComponentRef, forwardRef, Inject, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'deco-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnInit {


  constructor() { }


  ngOnInit() {
    
  }

}
