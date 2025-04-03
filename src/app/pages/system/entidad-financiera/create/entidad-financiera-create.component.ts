import { DtoEntidadFinancieraCreate } from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraCreate';
import { EntidadFinancieraService } from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';
import { getErrorByKey } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { EntidadFinancieraStore } from '@/stores/system/EntidadFinancieraStore';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
        FileUpload
  ],
  templateUrl: './entidad-financiera-create.component.html',
  styleUrl: './entidad-financiera-create.component.css'
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
    logo: new FormControl<any>(this.selectedFile, {
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
    
    onFileSelect(event:UploadEvent) {

      this.helperStore.showToast({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
      console.log(event)
     /* const file = event.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        this.selectedFile = file;
      } */
    }
  
    getErrorMessageOnCreate(controlName: string): string {
      const control = this.FormEntidadFinancieraCreate.get(controlName as string);
      return getErrorByKey(controlName, control);
    }
  
    handleSubmit() {
      this.FormEntidadFinancieraCreate.markAllAsTouched();
      console.log()
  
      if (this.FormEntidadFinancieraCreate.valid) {
        this.isSubmitting.set(true);
        const selectedValues = this.FormEntidadFinancieraCreate.getRawValue();
  
        this.entidadFinancieraService.store(selectedValues as DtoEntidadFinancieraCreate).subscribe({
          next: (response) => {
            this.isSubmitting.set(false);
            this.onCloseModalCreate();
            this.helperStore.showToast({
              severity: 'success',
              summary: 'Ubigeo registrado',
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
