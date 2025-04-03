import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoConfirmacionCreateComponent } from './estado-confirmacion-create.component';

describe('EstadoConfirmacionCreateComponent', () => {
  let component: EstadoConfirmacionCreateComponent;
  let fixture: ComponentFixture<EstadoConfirmacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoConfirmacionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoConfirmacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
