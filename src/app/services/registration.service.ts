import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationForm } from '../Models/registration-form.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  apiURL: string = 'https://localhost:7236/api/RegistrationForm';
  constructor(private http:HttpClient) { }
  getRegistrationFormByFormId(formId:number){
    return this.http.get(`${this.apiURL}/${formId}`);
  }
  getRegistrationFormIdByEventId(eventId:number){
    return this.http.get(`${this.apiURL}/formIdByEventId?eventId=${eventId}`);
  }
  getRegistrationFormByEventId(eventId:number){
    return this.http.get(`${this.apiURL}/formByEventId?eventId=${eventId}`);
  }

  postRegistrationForm(registrationForm:RegistrationForm){
    return this.http.post(this.apiURL,registrationForm);
  }

  getRegistrationFormByEventIdAndUserId(eventId:number,userId:number){
    return this.http.get(`${this.apiURL}/formIdByEventIdAndUserId?eventId=${eventId}&userId=${userId}`);
  }
}
