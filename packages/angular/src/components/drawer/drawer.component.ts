/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Drawer component - bottom sheet with backdrop + Escape close
 */

import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/utils';

@Component({
  selector: 'ui-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 bg-black/80" (click)="close()"></div>
    <div
      *ngIf="open"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="title"
      [class]="cn(
        'fixed inset-x-0 bottom-0 z-50 mx-auto flex h-auto max-h-[90vh] flex-col overflow-y-auto rounded-t-[10px] border border-border bg-background',
        class
      )"
    >
      <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>
      <div *ngIf="title" class="grid gap-1.5 p-4 text-center">
        <h2 class="text-lg font-semibold leading-none tracking-tight">{{ title }}</h2>
        <p *ngIf="description" class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
      <div class="mt-auto flex flex-col gap-2 p-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() description = '';
  @Input() class = '';

  @Output() openChange = new EventEmitter<boolean>();

  cn = cn;

  close(): void {
    this.open = false;
    this.openChange.emit(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.close();
  }
}
