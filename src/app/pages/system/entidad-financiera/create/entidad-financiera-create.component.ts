import { DtoEntidadFinancieraCreate } from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraCreate';
import { EntidadFinancieraService } from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';
import { getErrorByKey } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { EntidadFinancieraStore } from '@/stores/system/EntidadFinancieraStore';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUpload, FileUploadEvent, UploadEvent } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-entidad-financiera-create',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    RadioButton,
    FileUpload,
  ],
  templateUrl: './entidad-financiera-create.component.html',
  styleUrl: './entidad-financiera-create.component.css',
})
export class EntidadFinancieraCreateComponent {
  helperStore = inject(HelperStore);
  entidadFinancieraStore = inject(EntidadFinancieraStore);
  entidadFinancieraService = inject(EntidadFinancieraService);
  formBuilder = inject(FormBuilder);
  isActive!: boolean;
  //Para el archivo
  selectedFile: File | null = null;

  FormEntidadFinancieraCreate = this.formBuilder.group({
    nombre: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    iniciales: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: false,
    }),
    logo: new FormControl<any>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {}

  onCloseModalCreate() {
    this.entidadFinancieraStore.closeModalCreate();
    this.FormEntidadFinancieraCreate.reset();
  }

  onFileSelect(event: any) {
    console.log('onFileSelect evento:', event);
    if (event.currentFiles && event.currentFiles.length > 0) {
      this.selectedFile = event.currentFiles[0];
      console.log('Archivo seleccionado (onFileSelect):', this.selectedFile);
      
      this.FormEntidadFinancieraCreate.patchValue({
        logo: this.selectedFile
      });
    }
  }

  

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.FormEntidadFinancieraCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEntidadFinancieraCreate.markAllAsTouched();

    // To send data in FormData format
    let name =  this.FormEntidadFinancieraCreate.get('nombre')?.value ?? '';
    let iniciales =  this.FormEntidadFinancieraCreate.get('iniciales')?.value ?? '';

    const formData = new FormData();
    formData.append('nombre', name);
    formData.append('iniciales', iniciales);
    formData.append('estado', this.FormEntidadFinancieraCreate.get('estado')?.value ? 'true': 'false' );
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

      if (this.FormEntidadFinancieraCreate.valid) {
        this.isSubmitting.set(true);
        const selectedValues = this.FormEntidadFinancieraCreate.getRawValue();
  
        this.entidadFinancieraService.store(formData).subscribe({
          next: (response) => {
            this.isSubmitting.set(false);
            this.onCloseModalCreate();
            this.helperStore.showToast({
              severity: 'success',
              summary: 'Entidad Financiera registrada exitosamente',
              detail: response.message,
            });
            this.entidadFinancieraStore.doList();
          },
          error: (err) => {
            this.isSubmitting.set(false);
            this.helperStore.showToast({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
            });
          },
        });
      } else {
        this.helperStore.showToast({
          severity: 'error',
          summary: 'Error',
          detail: 'Complete los campos requeridos',
        });
      }
  }
}
