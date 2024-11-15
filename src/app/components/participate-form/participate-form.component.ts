import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participate-form',
  templateUrl: './participate-form.component.html',
  styleUrls: ['./participate-form.component.css']
})
export class ParticipateFormComponent {
  eventId!:string;
  userId!:string;
  constructor(private ActivatedRoute:ActivatedRoute) {
    this.eventId = this.ActivatedRoute.snapshot.queryParams['eventId'];
    this.userId = this.ActivatedRoute.snapshot.queryParams['userId'];
  }
}
