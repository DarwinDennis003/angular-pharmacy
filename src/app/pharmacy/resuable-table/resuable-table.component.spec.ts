import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuableTableComponent } from './resuable-table.component';
import { MatTableModule } from '@angular/material/table';

describe('ResuableTableComponent', () => {
  let component: ResuableTableComponent;
  let fixture: ComponentFixture<ResuableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResuableTableComponent],
      imports: [MatTableModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResuableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
