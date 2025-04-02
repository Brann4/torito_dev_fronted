import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { ToolbarStore } from '@/stores/ToolbarStore';
import { AuthService } from '@/app/services/auth.service';
import { HelperStore } from '@/stores/HelpersStore';
import { AuthStore } from '@/stores/AuthStore';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { getErrosOnControls } from '@/helpers';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  username!: string;
  password!: string;
  authService  = inject(AuthService)
  toolbarStore  = inject(ToolbarStore)
  helpers  = inject(HelperStore)
  authStore = inject(AuthStore)
  router = inject(Router)

  isSubmitting = signal<boolean>(false)

  constructor(
    private fb: FormBuilder,
  ) {
    this.frmLogin = this.fb.group({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
    })
    // this.toolbarStore.isDarkModeActive()

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.frmLogin.markAllAsTouched()
    if(this.frmLogin.status === 'VALID'){
      this.isSubmitting.set(true)
      this.router.navigate(['/system/bienvenido'])


    }else{
      this.helpers.showToast({severity:'error',summary:'Error',detail:'Formulario invalido'})
      console.log("Formulario invalido",this.frmLogin)
      console.log(getErrosOnControls(this.frmLogin))
    }
  }
}
