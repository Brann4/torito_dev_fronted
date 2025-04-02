import { UbigeoService } from '@/app/services/system/mantenimiento/ubigeo/ubigeo.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { UbigeosStore } from '@/stores/system/UbigeoStore';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-ubigeo-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './ubigeo-create.component.html',
})
export class UbigeoCreateComponent implements OnInit {
  helperStore = inject(HelperStore);
  ubigeoStore = inject(UbigeosStore);
  ubigeoService = inject(UbigeoService);
  formBuilder = inject(FormBuilder);

  formCreate = this.formBuilder.group({
    id_pais: new FormControl<string>('',{ validators : [Validators.required,Validators.minLength(2)] , nonNullable : true})
  })

  isSubmitting = signal<boolean>(false)

  ngOnInit(): void {}
}
