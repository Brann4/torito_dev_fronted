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
  helperStore  = inject(HelperStore)
  authStore = inject(AuthStore)
  router = inject(Router)

  isSubmitting = signal<boolean>(false)

  constructor(
    private fb: FormBuilder,
  ) {
    this.frmLogin = this.fb.group({
      correo_electronico : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
    })
    // this.toolbarStore.isDarkModeActive()

  }

  ngOnInit(): void {
    if(!this.authStore.isLoggedIn()){
      this.router.navigate(['/'])
    }
  }

  onSubmit() {
    this.frmLogin.markAllAsTouched()

    if(this.frmLogin.valid){
      this.isSubmitting.set(true);

      this.authService.login(this.frmLogin.value).subscribe({
        next: async (response) => {
          const success = await this.authStore.handleLoginResponse(response);
          //this.authStore.getUserAuthenticated().then(user => console.log(user))
          if (success) {
            this.isSubmitting.set(false);
            this.helperStore.showToast({
              severity: 'success',
              summary: 'Login exitoso',
              detail: 'Bienvenido al sistema',
            });
            this.router.navigate(['/system/dashboard']);
          }else{
            this.isSubmitting.set(false);
            this.helperStore.showToast({
              severity: 'error',
              summary: 'Error',
              detail: 'Credenciales no registradas en el sistema',
            });
            this.router.navigate(['/']);
          }

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


    }else{
      this.helperStore.showToast({severity:'error',summary:'Error',detail:'Formulario invalido'})
      console.log("Formulario invalido",this.frmLogin)
      console.log(getErrosOnControls(this.frmLogin))
    }
  }
}
