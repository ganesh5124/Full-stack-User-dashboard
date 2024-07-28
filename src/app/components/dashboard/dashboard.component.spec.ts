import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasshboardComponent } from './dashboard.component';

describe('DasshboardComponent', () => {
  let component: DasshboardComponent;
  let fixture: ComponentFixture<DasshboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasshboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DasshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
