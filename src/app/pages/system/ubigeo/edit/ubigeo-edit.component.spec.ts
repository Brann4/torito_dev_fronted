import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbigeoEditComponent } from './ubigeo-edit.component';

describe('UbigeoEditComponent', () => {
  let component: UbigeoEditComponent;
  let fixture: ComponentFixture<UbigeoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbigeoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbigeoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
