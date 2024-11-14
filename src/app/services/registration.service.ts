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
  getRegistrationFormByEventId(eventId:number){
    return this.http.get(`${this.apiURL}/formIdByEventId?eventId=${eventId}`);
  }

  postRegistrationForm(registrationForm:RegistrationForm){
    console.log(registrationForm);
    // this.getRegistrationFormByEventId(registrationForm.eventId).subscribe((data)=>{
    //   if(data){
    //      return this.http.put(`${this.apiURL}/${registrationForm.eventId}`,registrationForm).subscribe();
    //   }else{
    //      return this.http.post(this.apiURL,registrationForm).subscribe();
    //   }
    // })
    return this.http.post(this.apiURL,registrationForm);
  }
}
