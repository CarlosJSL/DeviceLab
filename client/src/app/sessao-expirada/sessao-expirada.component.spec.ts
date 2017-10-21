import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoExpiradaComponent } from './sessao-expirada.component';

describe('SessaoExpiradaComponent', () => {
  let component: SessaoExpiradaComponent;
  let fixture: ComponentFixture<SessaoExpiradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessaoExpiradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessaoExpiradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
