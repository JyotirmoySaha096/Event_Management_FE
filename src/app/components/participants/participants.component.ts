import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent {
  eventId!: string;
  participants: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private participantService: ParticipantService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['eventId'];
      this.participantService
        .getPaticipantsByEventId(Number.parseInt(this.eventId))
        .subscribe((participants: any) => {
          this.participants = participants.participants["$values"];
        });
    });
  }
}
