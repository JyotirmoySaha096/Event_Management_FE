import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputTextboxComponent } from 'src/app/components/utils/custom-input-textbox/custom-input-textbox.component';
import { EventListComponent } from 'src/app/components/event-list/event-list.component';



@NgModule({
  declarations: [CustomInputTextboxComponent,EventListComponent],
  imports: [
    CommonModule
  ],
  exports:[CustomInputTextboxComponent,EventListComponent]
})
export class UtilitiesModule { }
