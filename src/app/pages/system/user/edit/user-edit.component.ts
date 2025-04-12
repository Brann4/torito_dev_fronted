import { DtoUserEdit } from '@/app/domain/dtos/system/user/DtoUserEdit';
import { UserService } from '@/app/services/system/user.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { UserStore } from '@/stores/system/UserStore';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    Select,
    DropdownModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  userStore = inject(UserStore);
  userService = inject(UserService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  employees = signal<any>(null)
  roles = signal<any>(null)

  frmEdit = this.formBuilder.group({
    id: new FormControl<number>(0, { validators: [Validators.min(1)], nonNullable: true }),
    name: new FormControl<string>({ value: '', disabled: true }, { validators: [Validators.required], nonNullable: true }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    role_id: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    employee_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true}),
  });

  hasLoaded = false;

  constructor() {
    effect(() => {
      if (this.userStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  ngOnInit() {
    this.loadInitialData();

    // this.employeeService.list().subscribe({
    //   next : (employees) => {
    //     const transformedData = employees.map((employee) => ({
    //       ...employee,
    //       fullName: `${employee.name} ${employee.lastname}`.toUpperCase()
    //     }));
    //     this.employees.set(transformedData);
    //   },
    //   error : (error) => {
    //     console.log({error})
    //   }
    // })
  }

  loadInitialData() {

  }

  loadEntityForEdit() {
    const entity = this.userStore.entityEdit();
    /*if (entity) {
      this.frmEdit.patchValue({ ...entity,
        employee_id: (entity.nombre)?entity.current_employee.id:null,
       });
    }*/
  }

  onCloseModalEdit() {
    this.userStore.closeModalEdit();
    this.frmEdit.reset();
    this.hasLoaded = false;
  }

  handleSubmit() {
    this.frmEdit.markAllAsTouched();
    if (this.frmEdit.valid) {
      console.log('Formulario válido:', this.frmEdit.getRawValue());
      this.userStore.setSubmitting(true);
      const values = this.frmEdit.getRawValue();
      this.userService.update(values as DtoUserEdit).subscribe({
        next: (response) => {
          this.userStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({ severity: 'success', summary: 'Actualizado', detail: response.message });
          this.userStore.doList();
        },
        error: (error) => {
          this.userStore.setSubmitting(false);
          this.helperStore.showToast({ severity: 'error', summary: 'Error', detail: error.error.message });
        },
      });
    } else {
      console.log(getErrosOnControls(this.frmEdit));
      this.helperStore.showToast({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
    }
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.frmEdit.get(controlName as string);
    return getErrorByKey(controlName, control);
  }
}
