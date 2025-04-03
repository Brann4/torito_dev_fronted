import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoWalletDetalleEditComponent } from './estado-wallet-detalle-edit.component';

describe('EstadoWalletDetalleEditComponent', () => {
  let component: EstadoWalletDetalleEditComponent;
  let fixture: ComponentFixture<EstadoWalletDetalleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoWalletDetalleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoWalletDetalleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
