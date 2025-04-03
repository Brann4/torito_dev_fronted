import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoConfirmacionComponent } from './estado-confirmacion.component';

describe('EstadoConfirmacionComponent', () => {
  let component: EstadoConfirmacionComponent;
  let fixture: ComponentFixture<EstadoConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoConfirmacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
