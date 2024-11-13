import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputTextboxComponent } from './custom-input-textbox.component';

describe('CustomInputTextboxComponent', () => {
  let component: CustomInputTextboxComponent;
  let fixture: ComponentFixture<CustomInputTextboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputTextboxComponent]
    });
    fixture = TestBed.createComponent(CustomInputTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
