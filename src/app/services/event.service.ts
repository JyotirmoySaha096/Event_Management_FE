// src/app/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventBO } from '../Models/event-bo.model'; // Create a model for EventBO

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7236/api/Event';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<EventBO[]> {
    return this.http.get<EventBO[]>(this.apiUrl);
  }

  // Get a specific event by ID
  getEventById(id: number): Observable<EventBO> {
    return this.http.get<EventBO>(`${this.apiUrl}/${id}`);
  }

  // Create a new event
  createEvent(event: EventBO): Observable<EventBO> {
    return this.http.post<EventBO>(this.apiUrl, event);
  }

  // Update an existing event
  updateEvent(id: number, event: EventBO): Observable<EventBO> {
    return this.http.put<EventBO>(`${this.apiUrl}/${id}`, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
