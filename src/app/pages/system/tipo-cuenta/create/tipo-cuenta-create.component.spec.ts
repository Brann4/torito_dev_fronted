import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentaCreateComponent } from './tipo-cuenta-create.component';

describe('TipoCuentaCreateComponent', () => {
  let component: TipoCuentaCreateComponent;
  let fixture: ComponentFixture<TipoCuentaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoCuentaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCuentaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
