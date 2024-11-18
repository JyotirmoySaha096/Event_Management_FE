import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  apiURL: string = 'https://localhost:7236/api/Participant';
  constructor(private http:HttpClient) { }

  getParticipantByParticipantId(id:number){
    return this.http.get(`${this.apiURL}/${id}`);
  }
  getPaticipantsByEventId(eventId:number){}
  getPaticipantsByUserId(userId:number){}

  getParticipantIdByEventIdAndUserId(eventId:number,userId:number){
    return this.http.get(`${this.apiURL}?eventId=${eventId}&userId=${userId}`);
  }
  postParticipant(participant:any){
    return this.http.post(this.apiURL,participant);
  }
}