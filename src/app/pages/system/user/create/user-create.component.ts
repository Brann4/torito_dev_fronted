import { DtoUserCreate } from '@/app/domain/dtos/system/user/DtoUserCreate';
import { UserService } from '@/app/services/system/user.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { UserStore } from '@/stores/system/UserStore';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

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
    CommonModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {
  userStore = inject(UserStore)
  userService = inject(UserService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)

  employees = signal<any>(null)
  roles = signal<any>(null)

  frmCreate = this.formBuilder.group({
    // name : new FormControl<string>({ value: '', disabled: true },{ validators : [Validators.required] , nonNullable : true }),
    email : new FormControl<string>('',{ validators : [Validators.required,Validators.email] , nonNullable : true}),
    role_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true}),
    employee_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true}),
  })

  isSubmitting = signal<boolean>(false)

  constructor() {
    this.loadInitialData()
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
    // this.roleService.list().subscribe(data => this.roles.set(data));
  }

  onCloseModalCreate(){
    this.userStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
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
    }

  }


  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

}
