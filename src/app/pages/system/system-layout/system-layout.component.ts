import { Component, HostListener, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PanelMenu, PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '@/app/services/auth.service';
import { FooterLayoutComponent } from './footer/footer-layout.component';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarStore } from '@/stores/ToolbarStore';
import { Popover } from 'primeng/popover';
import { AuthStore } from '@/stores/AuthStore';
import { ProfileStore } from '@/stores/system/ProfileStore';
import { ProfileComponent } from './profile/profile.component';
import { Tooltip } from 'primeng/tooltip';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { HelperStore } from '@/stores/HelpersStore';
import { NotificationService } from '@/app/services/notification.service';
import { UserEntity } from '@/app/domain/entities/UserEntity';

@Component({
  selector: 'app-system-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    InputTextModule,
    CommonModule,
    ChipModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    AvatarModule,
    TableModule,
    CardModule,
    MenuModule,
    FooterLayoutComponent,
    DialogModule,
    BadgeModule,
    DrawerModule,
    Tooltip,
    ProfileComponent,
    OverlayBadgeModule,
    PanelMenu
],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.css',
})
export class SystemLayoutComponent implements OnInit{
  @ViewChild('notificationPanel') notificationPanel: any;

  items: any[] = [];
  visibleSidebar: boolean = false;
  isScreenWide: boolean = true;
  isMobileDevice = false;


  displayDialog: boolean = false;
  authStore = inject(AuthStore)
  toolbarStore = inject(ToolbarStore)
  authService = inject(AuthService)
  profileStore = inject(ProfileStore)
  helperStore = inject(HelperStore);
  notificationService = inject(NotificationService);

  user = signal<UserEntity>({
    id_usuario: 0,
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    id_tipo_documento: 0,
    numero_documento: '',
    correo_electronico: '',
    password: '',
    id_rol: 0,
    is_super: false,
    estado: false,
    usuario_creacion: 0,
    usuario_modificacion: 0,

  })

  menu = signal<any[]>([]);

  constructor(private router: Router) {

    this.menu.update(() => {
      const currentMenu = this.authStore.getMenu();

      return [
        {
          label: 'Dashboard',
          route: 'dashboard',
          icon: 'pi pi-home',
        },
        {
          label: 'Usuarios',
          group: true,
          icon: 'pi pi-usuario',
          items: [
            {
              label: 'Usuarios',
              route: 'usuarios',
              icon: 'pi pi-user'
            },
            {
              label: 'Rol',
              route: 'rol',
              icon: 'pi pi-users'
            },
          ]
        },
        {
          label: 'Mantenimiento',
          group: true,
          icon: 'pi pi-usuario',
          items: [
            {
              label: 'Ubigeo',
              route: 'ubigeo',
              icon: 'pi pi-map-marker'
            },
            {
              label: 'Entidad Financiera',
              route: 'entidad-financiera',
              icon: 'pi pi-building'
            },
            {
              label: 'Estados de Confirmacion',
              route: 'estados-confirmacion',
              icon: 'pi pi-list-check'
            },
            {
              label: 'Estado Detalle Wallet',
              route: 'estado-detalle-wallet',
              icon: 'pi pi-wallet'
            },
            {
              label: 'Tipo de Cuenta',
              route: 'tipo-cuenta',
              icon: 'pi pi-map-marker'
            },
            {
              label: 'Tipo Documento',
              route: 'tipo-documento',
              icon: 'pi pi-map-marker'
            },

          ]
        },

      ];
    });

    this.visibleSidebar = localStorage.getItem('visibleSidebar') === 'true';
    this.toolbarStore.isDarkModeActive();
  }

  ngOnInit() {
    this.checkScreenWidth();
    this.authStore.getUserAuthenticated().then((user) => {
      if (user) {
        this.user.set(user);
      }
    });

  }

  userMenuItems = [
    {
      label: 'Opciones',
      items: [
        { label: 'Salir', icon: 'pi pi-sign-out', command: () => this.onLogout() }
      ]
    },
  ];

  onProfile() {
    this.profileStore.openModalEdit(this.user());
  }

  onLogout() {
    this.authService.logout()
  }

  toggleDarkMode() {
    this.toolbarStore.toggleDark()
  }

  toggleSidebar(){
    this.visibleSidebar = !this.visibleSidebar;
   // localStorage.setItem('visibleSidebar', this.visibleSidebar ? 'true' : 'false');
  }

  onSidebarClose(){
    this.visibleSidebar = false;
   // localStorage.setItem('visibleSidebar', 'false');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }


  checkScreenWidth() {
    this.visibleSidebar = false;
    this.isScreenWide = false
    this.isMobileDevice = this.checkIfMobileDevice();

    if (this.isMobileDevice) {
      this.visibleSidebar = false;
      this.isScreenWide = false

    } else {
      this.visibleSidebar = true;
      this.isScreenWide = true
    }
  }

  checkIfMobileDevice() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;

    return isTouchDevice || isSmallScreen;
  }

  handleNotificationClick(event: Event) {
    this.notificationPanel.toggle(event); // Abre o cierra el panel
  }

  redirectNotification(notification: any) {
    console.log(notification);
  }


}
