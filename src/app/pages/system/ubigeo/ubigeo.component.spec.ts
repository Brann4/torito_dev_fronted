import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbigeoComponent } from './ubigeo.component';

describe('UbigeoComponent', () => {
  let component: UbigeoComponent;
  let fixture: ComponentFixture<UbigeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbigeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbigeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
