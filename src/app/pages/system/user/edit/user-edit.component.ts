import { DtoUserEdit } from '@/app/domain/dtos/system/user/DtoUserEdit';
import { RolService } from '@/app/services/system/mantenimiento/rol/rol.service';
import { TipoDocumentoService } from '@/app/services/system/mantenimiento/tipo-documento/tipo-documento.service';
import { UserService } from '@/app/services/system/user.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { AuthStore } from '@/stores/AuthStore';
import { HelperStore } from '@/stores/HelpersStore';
import { UserStore } from '@/stores/system/UserStore';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-user-edit',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    Select,
    DropdownModule,
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    RadioButton,
    PasswordModule,
    ToggleSwitch,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {
  userStore = inject(UserStore);
  authStore = inject(AuthStore);
  userService = inject(UserService);
  tipoDocumentoService = inject(TipoDocumentoService);
  roleService = inject(RolService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  tiposDocumento = signal<any>(null);
  roles = signal<any>(null);

  frmEdit = this.formBuilder.group({
    id_usuario: new FormControl<number>(
      { value: 0, disabled: true },
      { validators: [Validators.min(1)], nonNullable: true }
    ),
    nombre: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    apellido_paterno: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    apellido_materno: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    id_tipo_documento: new FormControl<number>(0, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    numero_documento: new FormControl<string>('', {
      validators: [Validators.min(9)],
      nonNullable: true,
    }),
    correo_electronico: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl<string>('', { nonNullable: true }),
    id_rol: new FormControl<number>(0, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    is_super: new FormControl<boolean>(false, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    usuario_modificacion: new FormControl<number>(
      Number(this.authStore.getUserId()),
      { nonNullable: true }
    ),
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
  }

  loadInitialData() {
    this.loadTiposDocumentos();
    this.loadRoles();
  }

  loadTiposDocumentos() {
    this.tipoDocumentoService
      .list()
      .subscribe((data) =>
        this.tiposDocumento.set(
          data.filter((documento) => documento.estado == true)
        )
      );
  }
  loadRoles() {
    this.roleService
      .list()
      .subscribe((data) =>
        this.roles.set(data.filter((rol) => rol.estado == true))
      );
  }

  loadEntityForEdit() {
    const entity = this.userStore.entityEdit();
    if (entity) {
      this.frmEdit.patchValue({
        ...entity,
        numero_documento: entity.numero_documento,
        password: '',
        usuario_modificacion: Number(this.authStore.getUserId()),
      });
    }
  }

  onCloseModalEdit() {
    this.userStore.closeModalEdit();
    this.frmEdit.reset({
      usuario_modificacion: Number(this.authStore.getUserId()),
    });
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.frmEdit.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.frmEdit.markAllAsTouched();
    const values = this.frmEdit.getRawValue();

    if (this.frmEdit.valid) {
      this.userStore.setSubmitting(true);
      const values = this.frmEdit.getRawValue();
      this.userService.update(values as DtoUserEdit).subscribe({
        next: (response) => {
          this.userStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Actualizado',
            detail: response.message,
          });
          this.userStore.doList();
        },
        error: (error) => {
          this.userStore.setSubmitting(false);
          this.helperStore.showToast({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
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
