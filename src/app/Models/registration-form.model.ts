import { FormField } from "./form-field.model";

export interface RegistrationForm{
    formId: number;
    eventId: number;
    formFields: FormField[];
}