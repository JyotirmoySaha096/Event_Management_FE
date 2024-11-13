import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventRecord } from 'src/app/Models/event-record.model';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css'],
})
export class OrganizerDashboardComponent {
  events!: EventRecord[];
  organizer!: User;
  organizerId!: string|null;
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.organizerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getEventsByOrganizerId(this.organizerId!).subscribe((events) => {
      this.events = events[
        '$values' as keyof EventRecord[]
      ] as unknown as EventRecord[];
    });

    this.authService.loggedInState.subscribe((state) => {
      if (state.isLoggedIn && this.organizerId) {
        this.userService.getUserById(this.organizerId).subscribe(
          (user: User) => {
            this.organizer = user;
          }
        );
      }
    });
  }

  handleEditEvent(id: string = '1') {

  }
}
