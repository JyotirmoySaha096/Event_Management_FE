export interface EventBO {
    eventId: number;
    organizerId: number;
    title: string;
    description?: string;
    location: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    createdBy: string;
    lastModifiedAt?: string;
    lastModifiedBy?: string;
    isPaid: boolean;
    price: number;
    organizer: any;  // Assuming you have a model for UserBO as well
    participants: any[];
    registrationForms: any[];
  }
  