import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditClaimComponent } from './modal-edit-claim.component';

describe('ModalEditClaimComponent', () => {
  let component: ModalEditClaimComponent;
  let fixture: ComponentFixture<ModalEditClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditClaimComponent]
    });
    fixture = TestBed.createComponent(ModalEditClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
