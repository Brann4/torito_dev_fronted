import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-footer-layout',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './footer-layout.component.html',
  styleUrl: './footer-layout.component.css'
})
export class FooterLayoutComponent {

}
