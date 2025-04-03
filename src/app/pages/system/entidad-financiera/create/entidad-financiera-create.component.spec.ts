import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadFinancieraCreateComponent } from './entidad-financiera-create.component';

describe('EntidadFinancieraCreateComponent', () => {
  let component: EntidadFinancieraCreateComponent;
  let fixture: ComponentFixture<EntidadFinancieraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadFinancieraCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadFinancieraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
