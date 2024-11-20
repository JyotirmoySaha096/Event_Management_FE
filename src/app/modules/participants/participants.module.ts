import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantsComponent } from 'src/app/components/participants/participants.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ParticipantsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:ParticipantsComponent,pathMatch:'full'}])
  ]
})
export class ParticipantsModule { }
