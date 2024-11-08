import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { EventBO } from 'src/app/Models/event-bo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm!: FormGroup;
  eventId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Check if we're editing an existing event
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.eventId = +id;
        this.loadEventData();
      }
    });
  }

  private initializeForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isPaid: [false],
      price: [0, Validators.required]
    });
  }

  loadEventData(): void {
    if (this.eventId) {
      this.isLoading = true;
      this.eventService.getEventById(this.eventId).subscribe((event: EventBO) => {
        this.eventForm.patchValue(event);  // Patches form with data
        this.isLoading = false;
      });
    }
  }

  saveEvent(): void {
    if (this.eventForm.invalid) {
      return;
    }

    const eventData: EventBO = this.eventForm.value;
    if (this.eventId) {
      // Update existing event
      this.eventService.updateEvent(this.eventId, eventData).subscribe(() => {
        this.router.navigate(['/events']);  // Navigate to events list after saving
      });
    } else {
      // Create new event
      this.eventService.createEvent(eventData).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }

  deleteEvent(): void {
    if (this.eventId) {
      this.eventService.deleteEvent(this.eventId).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
}
