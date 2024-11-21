import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FieldOption } from 'src/app/Models/field-option.model';
import { FormField } from 'src/app/Models/form-field.model';
import { RegistrationForm } from 'src/app/Models/registration-form.model';
import { ParticipantService } from 'src/app/services/participant.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-participate-form',
  templateUrl: './participate-form.component.html',
  styleUrls: ['./participate-form.component.css'],
})
export class ParticipateFormComponent {
  eventId!: string;
  userId!: string;

  // Define participationForm as FormGroup, which will have an array of FormGroup for each field
  participationForm: FormGroup;

  s1!: Subscription;
  s2!: Subscription;
  s3!: Subscription;
  participantId!: number;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private registrationService: RegistrationService,
    private participantService: ParticipantService,
    private router: Router
  ) {
    this.participationForm = new FormGroup({
      formFields: new FormArray([]),
    });

    this.eventId = this.ActivatedRoute.snapshot.queryParams['eventId'];
    this.userId = this.ActivatedRoute.snapshot.queryParams['userId'];

    this.s1 = this.participantService
      .getParticipantIdByEventIdAndUserId(
        Number.parseInt(this.eventId),
        Number.parseInt(this.userId)
      )
      .subscribe((data: any) => {
        console.log(data.message == 'Not registered');
        console.log(data);
        if (data.message == 'Not registered') {
          this.participantId = 0;
          this.loadFormData();
        } else if (data.message == 'Registered') {
          console.log('Already registered');
          this.router.navigate(['/register/already-registered']);
        }
      });
  }

  loadFormData(): void {
    if (this.eventId) {
      this.s2 = this.registrationService
        .getRegistrationFormByEventId(Number.parseInt(this.eventId))
        .subscribe((data: any) => {
          const form = data.form as RegistrationForm;
          const formFields = form.formFields[
            '$values' as keyof FormField[]
          ] as unknown as FormField[];
          formFields.forEach((field) => {
            const fieldOptions = field.fieldOptions[
              '$values' as keyof FieldOption[]
            ] as unknown as FieldOption[];

            const fieldGroup = new FormGroup({
              fieldId: new FormControl(field.fieldId),
              fieldName: new FormControl(field.fieldName),
              fieldType: new FormControl(field.fieldType),
              isRequired: new FormControl(field.isRequired),
              fieldValue: new FormControl(
                field.fieldValue,
                field.isRequired ? Validators.required : null
              ),
              fieldOptions: new FormArray([]),
            });
            fieldOptions.forEach((option) => {
              const optionGroup = new FormGroup({
                optionId: new FormControl(option.optionId),
                optionValue: new FormControl(option.optionText),
              });
              (fieldGroup.get('fieldOptions') as FormArray).push(optionGroup);
            });
            // Add each FormGroup to the FormArray
            (this.participationForm.get('formFields') as FormArray).push(
              fieldGroup
            );
          });
        });
    }
  }

  get formFields() {
    return (this.participationForm.get('formFields') as FormArray).controls;
  }

  onSubmit() {
    const toBeSent = {
      participantId: this.participantId,
      eventId: this.eventId,
      userId: this.userId,
      registrationDate: new Date().toISOString(),
      responses: this.participationForm.value.formFields.map(
        (field: FormField) => ({
          responseValue: field.fieldValue || '',
          fieldId: field.fieldId,
        })
      ),
    };
    this.s3 = this.participantService
      .postParticipant(toBeSent)
      .subscribe((data) => {
        // console.log(data);
        this.router.navigate(['/register/already-registered']);
      });
  }

  ngOnDestroy() {
    console.log('Destroying');
    this.s1?.unsubscribe();
    this.s2?.unsubscribe();
    this.s3?.unsubscribe();
  }
}
