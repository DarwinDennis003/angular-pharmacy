import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmulatorComponent } from './dialog-emulator.component';

describe('DialogEmulatorComponent', () => {
  let component: DialogEmulatorComponent;
  let fixture: ComponentFixture<DialogEmulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEmulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
