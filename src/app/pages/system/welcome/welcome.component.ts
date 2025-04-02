import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    TimelineModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
}
