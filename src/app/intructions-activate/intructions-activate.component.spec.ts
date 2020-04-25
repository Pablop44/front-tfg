import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntructionsActivateComponent } from './intructions-activate.component';

describe('IntructionsActivateComponent', () => {
  let component: IntructionsActivateComponent;
  let fixture: ComponentFixture<IntructionsActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntructionsActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntructionsActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
