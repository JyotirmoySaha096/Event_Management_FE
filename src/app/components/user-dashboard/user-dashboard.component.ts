import { Component } from '@angular/core';
import { EventRecord } from 'src/app/Models/event-record.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  events!: EventRecord[];

  constructor(private eventService: EventService) {
    console.log("Hello")
    this.eventService.getEvents().subscribe((events) => {
      console.log("Hello", events)
      this.events = events[
        '$values' as keyof EventRecord[]
      ] as unknown as EventRecord[];
      console.log(this.events)
    });
  }
}
