import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCred } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "https://localhost:7236/api/User";
  constructor(private http: HttpClient) { 
    
  }

  getUserById(id:string){
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  addUser(user:UserCred){
    return this.http.post<boolean>(this.userUrl,user);
  }
}
