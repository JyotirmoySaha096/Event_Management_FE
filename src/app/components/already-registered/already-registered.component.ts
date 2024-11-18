import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-already-registered',
  templateUrl: './already-registered.component.html',
  styleUrls: ['./already-registered.component.css'],
})
export class AlreadyRegisteredComponent {
  count: number = 5;
  intervalId!: any;
  constructor(private router: Router) {}
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count--;
      if (this.count <= 0) {
        this.router.navigate(['/event/all-events']);
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
