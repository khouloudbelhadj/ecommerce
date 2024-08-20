import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStandardComponent } from './navbar-standard.component';

describe('NavbarStandardComponent', () => {
  let component: NavbarStandardComponent;
  let fixture: ComponentFixture<NavbarStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarStandardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
