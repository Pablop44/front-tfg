import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAsmaComponent } from './informe-asma.component';

describe('InformeAsmaComponent', () => {
  let component: InformeAsmaComponent;
  let fixture: ComponentFixture<InformeAsmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeAsmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAsmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
