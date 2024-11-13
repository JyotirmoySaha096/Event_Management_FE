import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventRecord } from 'src/app/Models/event-record.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  @Input() events!: EventRecord[];
  @Input() title!: string;
  @Input()fromOrganizer!:boolean;
  currentUrl:string="";
  constructor(private router: Router, private eventService: EventService) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(){
    if (this.currentUrl.includes('event/all-events')) {
      this.eventService
        .getEvents()
        .subscribe(
          (events) =>
            this.events = events['$values' as keyof EventRecord[]] as unknown as EventRecord[]
        );
        console.log(this.events);
    }
    
  }
  handleEdit(eventId:number){
    this.router.navigate(['/event/edit',eventId]);
  }
  handleDisplayForm(eventId:number){

  }
}