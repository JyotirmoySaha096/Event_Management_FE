import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { ConfigureService } from 'src/app/services/configure.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  id!: string;
  @Input() user!: User;
  constructor(private router:Router,private configure:ConfigureService){}
  handleCreateEvent() {
    this.router.navigate(['/event/create']);
  }
  handleAllEvents(){
    this.router.navigate(['event/all-events']);
  }
}
