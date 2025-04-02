import { SidebarStore } from '@/stores/SidebarStore';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarModule,ButtonModule,SplitButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  sidebarStore = inject(SidebarStore);

  toggleSidebar(){
    this.sidebarStore.toggleSidebar();
  }
}
