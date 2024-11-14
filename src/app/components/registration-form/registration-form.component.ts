import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldOption } from 'src/app/Models/field-option.model';
import { FormField } from 'src/app/Models/form-field.model';
import { RegistrationForm } from 'src/app/Models/registration-form.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  eventId: number | null = null;
  formId: number | null = null;
  registrationForm: FormGroup = new FormGroup({
    formId: new FormControl({ value: this.formId || 0, disabled: true }),
    eventId: new FormControl({ value: this.eventId || 0, disabled: true }),
    formFields: new FormArray([] as FormControl<FormField>[]), // Empty array to hold dynamic form fields
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Access the query parameter using the activatedRoute
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params['id']);
      this.formId = params['id']; // Retrieve 'id' from route parameters
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['eventId']; // Retrieve 'eventId' from query parameters
      console.log('Event ID:', this.eventId); // Optionally log the eventId to the console
      if (this.eventId) {
        this.registrationService
          .getRegistrationFormByEventId(this.eventId)
          .subscribe(
            (res: any) => {
              this.router.navigate(['/form', res.formId], {
                queryParams: { eventId: this.eventId },
              });
            },
            (error) => {
              if (error.error.message == 'No form found') {
                this.registrationForm.setValue({
                  formId: this.formId || 0,
                  eventId: this.eventId || 0,
                  formFields: [],
                });
                this.loadFormData(); // Load form data based on eventId
              }
            }
          );
        this.registrationForm.setValue({
          formId: this.formId || 0,
          eventId: this.eventId || 0,
          formFields: [],
        });
        this.loadFormData(); // Load form data based on eventId
      }
    });
  }

  loadFormData(): void {
    if (this.formId) {
      this.registrationService
        .getRegistrationFormByFormId(this.formId)
        .subscribe(
          (data: any) => {
            if (data) {
              console.log(data);
              const form = data.form as RegistrationForm;
              this.eventId = form.eventId;
              const formFields = form.formFields[
                '$values' as keyof FormField[]
              ] as unknown as FormField[];
              formFields.forEach((field) => {
                this.addFormField(
                  field.fieldId,
                  field.formId,
                  field.fieldType,
                  field.fieldName,
                  field.isRequired,
                  (
                    field.fieldOptions[
                      '$values' as keyof FieldOption[]
                    ] as unknown as FieldOption[]
                  ).map((option: FieldOption) => ({
                    fieldId: option.fieldId,
                    optionId: option.optionId,
                    optionText: option.optionText,
                  })) as unknown as FieldOption[]
                );
              });
            }
          },
          (error) => {
            this.addFormField(0, this.formId || 0, 'text', 'Full Name', true);
            this.addFormField(0, this.formId || 0, 'dropdown', 'Gender', true, [
              { fieldId: 0, optionId: 0, optionText: 'Male' },
              { fieldId: 0, optionId: 0, optionText: 'Female' },
            ]);
          }
        );
    } else {
      this.addFormField(0, this.formId || 0, 'text', 'Full Name', true);
      this.addFormField(0, this.formId || 0, 'dropdown', 'Gender', true, [
        { fieldId: 0, optionId: 0, optionText: 'Male' },
        { fieldId: 0, optionId: 0, optionText: 'Female' },
      ]);
    }
  }

  // Getters for easier access to form fields
  get formFields() {
    return this.registrationForm.get('formFields') as FormArray;
  }
  fieldOptions(field: AbstractControl<any, any>) {
    return (field?.get('fieldOptions') as FormArray)?.controls;
  }

  // Add a new form field (either text or dropdown)
  addFormField(
    fieldId: number,
    formId: number,
    fieldType: string,
    fieldName: string,
    isRequired: boolean,
    options: FieldOption[] = [
      { fieldId, optionId: 0, optionText: 'Hello' } as FieldOption,
    ] as FieldOption[]
  ): void {
    const fieldGroup = new FormGroup({
      fieldId: new FormControl(fieldId),
      formId: new FormControl(formId),
      fieldName: new FormControl(fieldName, Validators.required),
      fieldType: new FormControl(fieldType),
      isRequired: new FormControl(isRequired),
      fieldValue: new FormControl(''),
      fieldOptions: new FormArray([]),
    });

    if (fieldType === 'dropdown') {
      this.addFieldOptions(fieldGroup, options);
    }

    this.formFields.push(fieldGroup);
  }

  // Add options for dropdown fields
  addFieldOptions(
    fieldGroup: AbstractControl<any, any>,
    options: FieldOption[]
  ): void {
    const fieldOptions = fieldGroup.get('fieldOptions') as FormArray;
    options.forEach((option) => {
      fieldOptions.push(
        new FormGroup({
          optionId: new FormControl(option.optionId),
          fieldId: new FormControl(option.fieldId),
          fieldOptionValue: new FormControl(
            option.optionText,
            Validators.required
          ),
        })
      );
    });
  }

  // Remove a form field
  deleteFormField(index: number): void {
    this.formFields.removeAt(index);
  }

  // Remove an option from dropdown field
  deleteFieldOption(fieldIndex: number, optionIndex: number): void {
    const fieldOptions = this.formFields
      .at(fieldIndex)
      .get('fieldOptions') as FormArray;
    fieldOptions.removeAt(optionIndex);
  }

  // Handle form submission
  onSubmit(): void {
    const formValue = this.registrationForm.value;
    const toSubmit = {
      formId: this.formId || 0,
      eventId: this.eventId,
      formFields: formValue.formFields.map((field: FormField) => {
        console.log(field.fieldOptions);
        return {
          fieldId: field.fieldId || 0,
          formId: this.formId || 0,
          fieldName: field.fieldName,
          fieldType: field.fieldType,
          fieldValue: field.fieldValue,
          isRequired: field.isRequired,
          fieldOptions: field.fieldOptions.map((option: any) => {
            return {
              optionId: option.optionId || 0,
              fieldId: option.fieldId || 0,
              optionText: option.fieldOptionValue,
            } as FieldOption;
          }),
        } as FormField;
      }),
    } as RegistrationForm;

    console.log('To Submit:', toSubmit);
    this.registrationService
      .postRegistrationForm(toSubmit)
      .subscribe(() => this.router.navigate(['/event/all-events']));
  }
}
