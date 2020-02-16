import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaIndividualComponent } from './ficha-individual.component';

describe('FichaIndividualComponent', () => {
  let component: FichaIndividualComponent;
  let fixture: ComponentFixture<FichaIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
