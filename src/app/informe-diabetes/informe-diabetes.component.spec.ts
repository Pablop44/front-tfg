import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDiabetesComponent } from './informe-diabetes.component';

describe('InformeDiabetesComponent', () => {
  let component: InformeDiabetesComponent;
  let fixture: ComponentFixture<InformeDiabetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeDiabetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
