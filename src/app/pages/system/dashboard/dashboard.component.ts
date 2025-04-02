


import { ContentHeaderComponent } from '@/app/components/content-header/content-header.component';
import { ToolbarStore } from '@/stores/ToolbarStore';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    CardModule,
    BreadcrumbModule,
    CommonModule,
    ContentHeaderComponent,
    PanelModule

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    data: any;
    options: any;
    breadcrumbs = [{ label: 'Dashboard' }]
    platformId = inject(PLATFORM_ID);
    toolbarStore = inject(ToolbarStore);
  
    constructor(private cd: ChangeDetectorRef) {}
  
    ngOnInit() {
      this.initChart();
    }
  
    initChart() {
      if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);

        this.data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Recibos por quartiles',
                    data: [540, 325, 702, 620],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };
    
        this.options = {
            plugins: {
                legend: {
                    labels: {
                        // color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // color: textColorSecondary
                    },
                    grid: {
                        // color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        // color: textColorSecondary
                    },
                    grid: {
                        // color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.cd.markForCheck();
      }
    }
  }
