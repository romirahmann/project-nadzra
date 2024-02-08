import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClaimComponent } from './detail-claim.component';

describe('DetailClaimComponent', () => {
  let component: DetailClaimComponent;
  let fixture: ComponentFixture<DetailClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailClaimComponent]
    });
    fixture = TestBed.createComponent(DetailClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
