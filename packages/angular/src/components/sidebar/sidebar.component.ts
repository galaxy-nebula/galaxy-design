/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Sidebar component - collapsible sidebar
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/utils';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside
      [class]="cn(
        'fixed inset-y-0 z-10 flex flex-col border-r border-border bg-sidebar transition-[width] duration-200',
        class
      )"
      [style.width]="open ? '16rem' : '3rem'"
    >
      <div class="flex items-center justify-end p-2">
        <button
          type="button"
          aria-label="Toggle sidebar"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
          (click)="toggle()"
        >
          ◑
        </button>
      </div>
      <ng-content></ng-content>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() open = true;
  @Input() class = '';

  @Output() openChange = new EventEmitter<boolean>();

  cn = cn;

  toggle(): void {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
