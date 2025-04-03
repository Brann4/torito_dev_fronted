import { Component, HostListener, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
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
    OverlayBadgeModule
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

  user = signal<any>({
    id : 0,
    name : '',
    email : '',
    constraint : '',
    email_verified_at : '',
    password : '',
    remember_token : '',
    created_at : '',
    updated_at : '',
    role_id : 0,
  })

  menu = signal<any[]>([]);

  constructor(private router: Router) {

    this.menu.update(() => {
      const currentMenu = this.authStore.getMenu();
      return [
        {
          label: 'Bienvenido',
          group: true,
          icon: 'pi pi-home',
          items: [
            {
              label: 'Bienvenido',
              route: 'bienvenido',
              icon: 'pi pi-arrow-right'
            }
          ]
        },
        {
          label: 'Mantenimiento',
          group: true,
          icon: 'pi pi-usuario',
          items: [
            {
              label: 'Usuarios',
              route: 'usuarios',
              icon: 'pi pi-arrow-right'
            },
            {
              label: 'Ubigeo',
              route: 'ubigeo',
              icon: 'pi pi-map-marker'
            },
            {
              label: 'Entidad Financiera',
              route: 'entidad-financiera',
              icon: 'pi pi-map-marker'
            },
            {
              label: 'Estados de Confirmacion',
              route: 'estados-confirmacion',
              icon: 'pi pi-map-marker'
            },
            {
              label: 'Estado Detalle Wallet',
              route: 'estado-detalle-wallet',
              icon: 'pi pi-map-marker'
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
        {
          label: 'Reporte',
          group: true,
          icon: 'pi pi-home',
          items: [
            {
              label: 'Dashboard',
              route: 'dashboard',
              icon: 'pi pi-arrow-right'
            }
          ]
        },

      ];
    });

    //this.visibleSidebar = localStorage.getItem('visibleSidebar') === 'true';
    this.toolbarStore.isDarkModeActive();
  }

  ngOnInit() {
    this.checkScreenWidth();
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
