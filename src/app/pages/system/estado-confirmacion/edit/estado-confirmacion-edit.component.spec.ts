import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoConfirmacionEditComponent } from './estado-confirmacion-edit.component';

describe('EstadoConfirmacionEditComponent', () => {
  let component: EstadoConfirmacionEditComponent;
  let fixture: ComponentFixture<EstadoConfirmacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoConfirmacionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoConfirmacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
