import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input-textbox',
  templateUrl: './custom-input-textbox.component.html',
  styleUrls: ['./custom-input-textbox.component.css']
})
export class CustomInputTextboxComponent {
  @Input() FieldTitle!:string;
  @Input() errors!:string[];
  @Input() description!:string;
  get Placeholder(): string {
    return `Enter your ${this.FieldTitle}`;
  }
  get isFieldValid():boolean{
    return this.errors.length <= 0;
  }
}
