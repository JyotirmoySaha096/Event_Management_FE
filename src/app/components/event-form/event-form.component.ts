import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { EventRecord } from 'src/app/Models/event-record.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm =this.fb.group({
    title: ['', Validators.required],
    description: [''],
    location: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    price: [0, [Validators.required,Validators.min(0)]]
  });
  eventId: number | null = null;
  isLoading = false;
  organizerId = localStorage.getItem('authToken');
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Check if we're editing an existing event
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.eventId = +id;
        this.loadEventData();
      }
    });
  }

  loadEventData(): void {
    if (this.eventId) {
      this.isLoading = true;
      this.eventService.getEventById(this.eventId).subscribe((event: EventRecord) => {
        this.eventForm.patchValue(event);  // Patches form with data
        this.isLoading = false;
      });
    }
  }

  saveEvent(): void {
    if (this.eventForm.invalid) {
      return;
    }

    const eventData: EventRecord = this.eventForm.value as EventRecord;
    if (this.eventId) {
      // Update existing event
      this.eventService.updateEvent(this.eventId, eventData).subscribe(() => {
        this.router.navigate([`/organizer/${this.organizerId}`]);  // Navigate to events list after saving
      });
    } else {
      // Create new event
      eventData.organizerId=Number.parseInt(this.organizerId||"");
      this.eventService.createEvent(eventData).subscribe(() => {
        this.router.navigate([`/organizer/${this.organizerId}`]);
      });
    }
  }

  deleteEvent(): void {
    if (this.eventId) {
      this.eventService.deleteEvent(this.eventId).subscribe(() => {
        this.router.navigate([`/organizer/${this.organizerId}`]);
      });
    }
  }
}
