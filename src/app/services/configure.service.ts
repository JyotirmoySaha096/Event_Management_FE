import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {
  baseUrl='http:'+'/'+'/'+'localhost:4200';
  constructor() { }
}
