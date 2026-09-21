/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Carousel component - scrollable slides with prev/next controls
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/utils';

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn('relative', class)" role="region" aria-roledescription="carousel">
      <div class="overflow-hidden">
        <div class="flex gap-4 transition-transform" [style.transform]="translate">
          <ng-content></ng-content>
        </div>
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        class="absolute left-1 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background opacity-50 hover:opacity-100"
        (click)="scrollPrev()"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next slide"
        class="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background opacity-50 hover:opacity-100"
        (click)="scrollNext()"
      >
        →
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  @Input() class = '';
  @Input() slideWidth = '100%';

  index = 0;

  get translate(): string {
    return `translateX(-${this.index * 100}%)`;
  }

  scrollPrev(): void {
    if (this.index > 0) this.index--;
  }

  scrollNext(): void {
    this.index++;
  }
}
