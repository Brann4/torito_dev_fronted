import { DtoResponseRol } from '@/app/domain/dtos/system/rol/DtoResponseRol';
import { DtoUserCreate } from '@/app/domain/dtos/system/user/DtoUserCreate';
import { RolService } from '@/app/services/system/mantenimiento/rol/rol.service';
import { TipoDocumentoService } from '@/app/services/system/mantenimiento/tipo-documento/tipo-documento.service';
import { UserService } from '@/app/services/system/user.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { UserStore } from '@/stores/system/UserStore';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
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
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { AuthStore } from '@/stores/AuthStore';


@Component({
  selector: 'app-user-create',
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
    RadioButton,
    PasswordModule,
    ToggleSwitch
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  userStore = inject(UserStore);
  authStore = inject(AuthStore);
  userService = inject(UserService);
  roleService = inject(RolService);
  tipoDocumentoService = inject(TipoDocumentoService)

  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  tiposDocumento = signal<any>(null);
  employees = signal<any>(null);
  roles = signal<any>(null);

  frmCreate = this.formBuilder.group({
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
    id_tipo_documento: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    numero_documento: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    correo_electronico: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    id_rol: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    is_super: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    usuario_creacion: new FormControl<number>(Number(this.authStore.getUserId()), {
      nonNullable: true,
    }),
  });

  isSubmitting = signal<boolean>(false);

  constructor() {
    this.loadInitialData();

  }

  ngOnInit() {
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
    this.loadRoles()
    this.loadTiposDocumentos()
  }

  loadRoles(){
    this.roleService
      .list()
      .subscribe((data) =>
        this.roles.set(data.filter((rol) => rol.estado == true))
      );
  }

  loadTiposDocumentos(){
    this.tipoDocumentoService
    .list()
    .subscribe( (data) =>
      this.tiposDocumento.set(data.filter ( (documento) => documento.estado == true ))
    );
  }

  onCloseModalCreate() {
    this.userStore.closeModalCreate();
    this.frmCreate.reset({
      usuario_creacion: Number(this.authStore.getUserId()),
    });
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.frmCreate.markAllAsTouched();
    console.log(this.frmCreate.getRawValue());

    /* if(this.frmCreate.valid){
      this.isSubmitting.set(true)
      const values = this.frmCreate.getRawValue()
      this.userService.store(values as DtoUserCreate)
      .subscribe({
        next : (response) => {
          this.isSubmitting.set(false)
          this.onCloseModalCreate()
          this.helperStore.showToast({severity : 'success', summary : 'Registrado', detail : response.message})
          this.userStore.doList()
        },
        error : (error) => {
          this.isSubmitting.set(false)
          console.log({error})
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
        }

      })
    }else{
      console.log(getErrosOnControls(this.frmCreate))
      this.helperStore.showToast({severity : 'error', summary : 'Error', detail : 'Complete los campos requeridos'})
    }*/
  }
}
