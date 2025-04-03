import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoWalletDetalleCreateComponent } from './estado-wallet-detalle-create.component';

describe('EstadoWalletDetalleCreateComponent', () => {
  let component: EstadoWalletDetalleCreateComponent;
  let fixture: ComponentFixture<EstadoWalletDetalleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoWalletDetalleCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoWalletDetalleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
