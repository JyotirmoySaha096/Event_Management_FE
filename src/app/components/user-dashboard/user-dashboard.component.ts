import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRecord } from 'src/app/Models/event-record.model';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  events!: EventRecord[];
  user!: User;
  userId!: string | null;
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.userId == 'null' || this.userId == '0') {
      this.router.navigate(['/']);
    } else {
      this.authService.loggedInState.subscribe((state) => {
        if (state.isLoggedIn && this.userId && state.authToken == this.userId) {
          this.userService.getUserById(this.userId).subscribe((user: User) => {
            this.user = user;
            this.eventService.getEvents().subscribe((events) => {
              this.events = events[
                '$values' as keyof EventRecord[]
              ] as unknown as EventRecord[];
            });
          });
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }

  handleEditEvent(id: string = '1') {}
}
