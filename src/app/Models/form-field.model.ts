import { FieldOption } from "./field-option.model";
import { UserResponse } from "./user-response.model";

export interface FormField {
    fieldId: number;
    formId: number;
    fieldName: string;
    fieldType: string;
    fieldValue: string;
    isRequired: boolean;
    fieldOptions: FieldOption[];
    responses: UserResponse[];
}