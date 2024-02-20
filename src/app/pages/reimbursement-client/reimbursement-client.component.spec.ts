import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementClientComponent } from './reimbursement-client.component';

describe('ReimbursementClientComponent', () => {
  let component: ReimbursementClientComponent;
  let fixture: ComponentFixture<ReimbursementClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReimbursementClientComponent]
    });
    fixture = TestBed.createComponent(ReimbursementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
