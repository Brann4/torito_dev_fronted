import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoEditComponent } from './tipo-documento-edit.component';

describe('TipoDocumentoEditComponent', () => {
  let component: TipoDocumentoEditComponent;
  let fixture: ComponentFixture<TipoDocumentoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDocumentoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDocumentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
