import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { ConfigureService } from 'src/app/services/configure.service';

@Component({
  selector: 'app-organizer-card',
  templateUrl: './organizer-card.component.html',
  styleUrls: ['./organizer-card.component.css'],
})
export class OrganizerCardComponent {
  id!: string;
  @Input() organizer!: User;
  @Input() isSuperAdmin!: boolean;
  constructor(private router:Router,private configure:ConfigureService){}
  handleCreateEvent() {
    this.router.navigate(['/event/create']);
  }
  handleAllEvents(){
    this.router.navigate(['event/all-events']);
  }
}
