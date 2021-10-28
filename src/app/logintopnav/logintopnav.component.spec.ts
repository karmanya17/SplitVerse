import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintopnavComponent } from './logintopnav.component';

describe('LogintopnavComponent', () => {
  let component: LogintopnavComponent;
  let fixture: ComponentFixture<LogintopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogintopnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
