import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventRecord } from '../Models/event-record.model'; // Create a model for EventRecord

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7236/api/Event';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<EventRecord[]> {
    return this.http.get<EventRecord[]>(this.apiUrl);
  }

  getEventsByOrganizerId(organizerId:string):Observable<EventRecord[]> {
    return this.http.get<EventRecord[]>(`${this.apiUrl}/organizer/${organizerId}`);
  }

  // Get a specific event by ID
  getEventById(id: number): Observable<EventRecord> {
    return this.http.get<EventRecord>(`${this.apiUrl}/${id}`);
  }

  // Create a new event
  createEvent(event: EventRecord): Observable<EventRecord> {
    return this.http.post<EventRecord>(this.apiUrl, event);
  }

  // Update an existing event
  updateEvent(id: number, event: EventRecord): Observable<EventRecord> {
    return this.http.put<EventRecord>(`${this.apiUrl}/${id}`, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
