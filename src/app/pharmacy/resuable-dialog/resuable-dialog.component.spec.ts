import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuableDialogComponent } from './resuable-dialog.component';

describe('ResuableDialogComponent', () => {
  let component: ResuableDialogComponent;
  let fixture: ComponentFixture<ResuableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResuableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResuableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
