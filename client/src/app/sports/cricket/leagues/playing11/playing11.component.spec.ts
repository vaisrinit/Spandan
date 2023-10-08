import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Playing11Component } from './playing11.component';

describe('Playing11Component', () => {
  let component: Playing11Component;
  let fixture: ComponentFixture<Playing11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Playing11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Playing11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
