import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParticipantTableComponent } from './manage-participant-table.component';

describe('ManageParticipantTableComponent', () => {
  let component: ManageParticipantTableComponent;
  let fixture: ComponentFixture<ManageParticipantTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageParticipantTableComponent]
    });
    fixture = TestBed.createComponent(ManageParticipantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
