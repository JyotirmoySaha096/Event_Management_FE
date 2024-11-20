import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganizerTableComponent } from './manage-organizer-table.component';

describe('ManageOrganizerTableComponent', () => {
  let component: ManageOrganizerTableComponent;
  let fixture: ComponentFixture<ManageOrganizerTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageOrganizerTableComponent]
    });
    fixture = TestBed.createComponent(ManageOrganizerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
