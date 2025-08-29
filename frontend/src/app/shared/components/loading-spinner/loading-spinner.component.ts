import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule],
  template: `
    <div class="loading-container" [class.overlay]="overlay" [class.fullscreen]="fullscreen">
      <div class="loading-content" [class.centered]="centered">
        <ng-container *ngIf="type === 'spinner'; else progressBar">
          <mat-spinner 
            [diameter]="size" 
            [color]="color"
            [mode]="mode">
          </mat-spinner>
        </ng-container>
        
        <ng-template #progressBar>
          <mat-progress-bar 
            [mode]="mode" 
            [color]="color"
            [value]="progress">
          </mat-progress-bar>
        </ng-template>
        
        <div class="loading-text" *ngIf="text">
          {{ text }}
        </div>
        
        <div class="loading-subtext" *ngIf="subtext">
          {{ subtext }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .loading-container.overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 1000;
    }
    
    .loading-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      z-index: 9999;
    }
    
    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    
    .loading-content.centered {
      justify-content: center;
    }
    
    .loading-text {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
    
    .loading-subtext {
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    
    .loading-container.overlay .loading-content,
    .loading-container.fullscreen .loading-content {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() type: 'spinner' | 'progress' = 'spinner';
  @Input() size: number = 40;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() progress: number = 0;
  @Input() text: string = '';
  @Input() subtext: string = '';
  @Input() overlay: boolean = false;
  @Input() fullscreen: boolean = false;
  @Input() centered: boolean = true;
}

