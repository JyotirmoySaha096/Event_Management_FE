import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateFormComponent } from './participate-form.component';

describe('ParticipateFormComponent', () => {
  let component: ParticipateFormComponent;
  let fixture: ComponentFixture<ParticipateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipateFormComponent]
    });
    fixture = TestBed.createComponent(ParticipateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
