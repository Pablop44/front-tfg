import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeMigranasComponent } from './informe-migranas.component';

describe('InformeMigranasComponent', () => {
  let component: InformeMigranasComponent;
  let fixture: ComponentFixture<InformeMigranasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeMigranasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeMigranasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
