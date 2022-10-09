import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManipulationComponent } from './account-manipulation.component';

describe('AccountManipulationComponent', () => {
  let component: AccountManipulationComponent;
  let fixture: ComponentFixture<AccountManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountManipulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
