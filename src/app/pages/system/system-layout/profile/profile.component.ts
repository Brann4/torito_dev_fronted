import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { UserService } from '@/app/services/system/user.service';
import { HelperStore } from '@/stores/HelpersStore';
import { ProfileStore } from '@/stores/system/ProfileStore';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    CommonModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    DialogModule,
    CardModule,
    BreadcrumbModule,
    AvatarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  userService = inject(UserService)
  profileStore = inject(ProfileStore)

  frmEdit = this.formBuilder.group({
    user_id : new FormControl<number>(0, { nonNullable: true }),
    password : new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
    confirm_password : new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
  }, {
    validators: this.passwordMatchValidator.bind(this)
  });

  constructor() {
    this.frmEdit.get('confirm_password')?.valueChanges.subscribe(() => {
      this.frmEdit.updateValueAndValidity();
    });

  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;

    if (confirmPassword.length >= 8) {
      if (confirmPassword && password !== confirmPassword) {
        form.get('confirm_password')?.setErrors({ passwordMismatch: true });
      } else {
        form.get('confirm_password')?.setErrors(null);
      }
    }
  }

  handleSubmit(){
    this.frmEdit.markAllAsTouched();
    if(this.frmEdit.status === 'VALID'){
      let userEntity = this.profileStore.entityEdit()
      if(userEntity){
        this.frmEdit.get('user_id')?.setValue(userEntity.id)

        const values = this.frmEdit.getRawValue()
        this.userService.updatePassword(values as any)
        .subscribe({
          next : (response) => {
            this.helperStore.showToast({severity : 'success', summary : 'Actualizado', detail : response.message})
            this.frmEdit.reset()
          },
          error : (error) => {
            console.log({error})
          }
  
        })
        this.profileStore.closeModalEdit()
      }else{
        console.log('No se ha seleccion un usuario')
      }
     
    }else{
      console.log(getErrosOnControls(this.frmEdit))
    }
  }
  onCloseModalEdit(){
    this.profileStore.closeModalEdit()
    this.frmEdit.reset()
  }

  getErrorMessageOnEdit(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    if (control?.errors) {
      if (control.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden.';
      }
      return getErrorByKey(controlName, control);
    }
    return '';
  }

  clearPlaceholder(controlName: string): void {
    const inputElement = document.getElementById(controlName) as HTMLInputElement;
    if (inputElement) {
        inputElement.placeholder = '';
    }
  }
}
