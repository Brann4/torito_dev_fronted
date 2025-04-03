import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoCreateComponent } from './tipo-documento-create.component';

describe('TipoDocumentoCreateComponent', () => {
  let component: TipoDocumentoCreateComponent;
  let fixture: ComponentFixture<TipoDocumentoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDocumentoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDocumentoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
