import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-content-header',
  standalone: true,
  imports: [
    Breadcrumb,
    CommonModule,
    RouterModule
    ],
  templateUrl: './content-header.component.html',
  styleUrl: './content-header.component.css'
})
export class ContentHeaderComponent implements OnInit {
  @Input() breadcrumbs: MenuItem[] = [];
  @Input() title: string = '';
  @Input() description: string = '';


  ngOnInit(): void {
    const homeBreadcrumb: MenuItem = { icon: 'pi pi-home', routerLink: '/system/bienvenido' };

    if (!this.breadcrumbs.some(item => item.label === 'Inicio')) {
      this.breadcrumbs = [homeBreadcrumb, ...this.breadcrumbs];
    }
  }

}
