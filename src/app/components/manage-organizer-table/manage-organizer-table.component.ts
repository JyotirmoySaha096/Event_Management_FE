import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-organizer-table',
  templateUrl: './manage-organizer-table.component.html',
  styleUrls: ['./manage-organizer-table.component.css'],
})
export class ManageOrganizerTableComponent {
  organizers!: User[];
  alertMessage: string = '';
  alertClass: string = '';
  @ViewChildren('roleSelect') roleSelects!: QueryList<NgModel>;
  disabled: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((x) => {
      this.organizers = (
        x.organizers['$values' as keyof User[]] as unknown as User[]
      ).filter((x) => x.role.roleName != 'Admin' || x.role.roleId != 1);
    });
  }
  handleRoleChange(userEmail: string, event: Event, ind: number) {
    this.disabled=true;
    const newRoleId = (event.target as HTMLSelectElement).value;
    console.log(userEmail, newRoleId);
    this.userService.updateUserRole(userEmail, newRoleId).subscribe(
      (result) => {
        console.log(result);
        console.log(this.roleSelects.toArray());
        this.alertMessage = 'Role updated successfully!';
        this.alertClass = 'alert-success';
        setTimeout(() => {
          this.alertMessage = '';
        }, 3000);
        this.disabled=false;
      },
      (error) => {
        const currentSelect = (
          this.roleSelects.toArray()[ind] as unknown as ElementRef
        )?.nativeElement;
        if (currentSelect) {
          currentSelect.disabled = false;
          currentSelect.value = `${newRoleId == '2' ? 3 : 2}`;
        }
        this.alertMessage = 'Failed to update role. Please try again later.';
        this.alertClass = 'alert-danger';
        setTimeout(() => {
          this.alertMessage = '';
        }, 3000);
        this.disabled=false;
      }
    );
  }
}
