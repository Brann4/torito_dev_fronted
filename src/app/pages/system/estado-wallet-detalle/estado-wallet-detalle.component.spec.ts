import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoWalletDetalleComponent } from './estado-wallet-detalle.component';

describe('EstadoWalletDetalleComponent', () => {
  let component: EstadoWalletDetalleComponent;
  let fixture: ComponentFixture<EstadoWalletDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoWalletDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoWalletDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
