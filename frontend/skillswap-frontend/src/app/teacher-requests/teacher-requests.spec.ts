import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequests } from './teacher-requests';

describe('TeacherRequests', () => {
  let component: TeacherRequests;
  let fixture: ComponentFixture<TeacherRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
