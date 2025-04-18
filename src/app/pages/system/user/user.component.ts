import { UserService } from '@/app/services/system/user.service';
import { HelperStore } from '@/stores/HelpersStore';
import { UserStore } from '@/stores/system/UserStore';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { UserCreateComponent } from './create/user-create.component';
import { UserEntity } from '@/app/domain/entities/UserEntity';
import { UserEditComponent } from './edit/user-edit.component';
import { DtoResponseUser } from '@/app/domain/dtos/system/user/DtoResponseUser';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ContentHeaderComponent } from '@/app/components/content-header/content-header.component';
import { RolStore } from '@/stores/system/RolStore';
import { TipoDocumentoStore } from '@/stores/system/TipoDocumentoStore';
import { AuthStore } from '@/stores/AuthStore';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    MenuModule,
    UserCreateComponent,
    UserEditComponent,
    IconField,
    InputIcon,
    ContentHeaderComponent,
    Tag,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',

  providers : [
    MessageService
  ],

})
export class UserComponent {
  breadcrumbs = [{ label: 'Usuarios' }]
  helperStore = inject(HelperStore)
  userStore = inject(UserStore)
  userService = inject(UserService)
  confirmationService = inject(ConfirmationService)

  rolStore = inject(RolStore)
  tipoDocumentoStore = inject(TipoDocumentoStore)

  rolName = signal<string>('')
  tipoDocumentoName = signal<string>('')

  //userId : number | null = this.authStore.getUserIdFromJWT(this.authStore.getJWT());

  selectedRow  = signal<DtoResponseUser|null>(null)
  options = signal([
    {
        label: 'Opciones',
        items: [
            {
                label: 'Editar',
                icon: 'pi pi-pen-to-square',
                command: () => {
                  this.onEdit(this.selectedRow());
                }
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                command: () => {
                  this.onDelete(this.selectedRow());
                }
            }]
    }
  ])

  constructor(){
    this.loadRoles()
    this.loadTiposDocumentos()
    this.loadTableUsers()
  }

  onSuccessCreate(){
    console.log("onSuccessCreate");
    this.loadTableUsers()
  }

  loadTableUsers(){
    this.userStore.doList()
  }

  loadRoles(){
    this.rolStore.doList()
  }
  loadTiposDocumentos(){
    this.tipoDocumentoStore.doList()
  }

  getRolNameById(idRol: number): string {
    const rol = this.rolStore.entities().find(r => r.id_rol === idRol);
    return rol?.nombre_rol ?? 'Rol no encontrado';
  }

  getTipoDocumentoById(idTipoDocumento: number): string {
    const documento = this.tipoDocumentoStore.entities().find(r => r.id_tipo_documento === idTipoDocumento);
    return documento?.descripcion ?? 'Documento no encontrado';
  }

  onOpenModalCreateUser(){
    this.userStore.openModalCreate()
  }

  onEdit(userEdit : DtoResponseUser|null){
    if(userEdit){
      this.userStore.openModalEdit(userEdit)
    }
  }

  onDelete(entity : DtoResponseUser|null){
    if(entity){
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres continuar?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
            severity: 'danger',
            label: 'Eliminar',
        },
        acceptIcon:"pi pi-check",
        rejectIcon:"pi pi-times",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.userService.delete(entity.id_usuario).subscribe({
              next: (response) => {
                this.userStore.doList()
                this.helperStore.showToast({severity: 'success', summary: 'Eliminado', detail: response.message })
              },
              error: (error) => {
                console.error(error)
                this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' })
              }
            })
        },
        reject: () => {
          this.helperStore.showToast({severity: 'warn', summary: 'Cancelado', detail: 'Ha cancelado la eliminación' })
        }
      })

    }else{
      console.warn("El usuario para eliminar no esta seleccionado")
    }
  }

  onOpenMenuOptionsRowTable(event : MouseEvent, menu : any, row : any){
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }


}
