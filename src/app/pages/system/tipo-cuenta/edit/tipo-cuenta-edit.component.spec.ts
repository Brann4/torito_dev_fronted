import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentaEditComponent } from './tipo-cuenta-edit.component';

describe('TipoCuentaEditComponent', () => {
  let component: TipoCuentaEditComponent;
  let fixture: ComponentFixture<TipoCuentaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoCuentaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCuentaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
