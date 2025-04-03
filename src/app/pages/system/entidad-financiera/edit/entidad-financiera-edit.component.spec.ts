import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadFinancieraEditComponent } from './entidad-financiera-edit.component';

describe('EntidadFinancieraEditComponent', () => {
  let component: EntidadFinancieraEditComponent;
  let fixture: ComponentFixture<EntidadFinancieraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadFinancieraEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadFinancieraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
