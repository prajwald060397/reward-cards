import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-panel',
  imports: [],
  templateUrl: './sort-panel.html',
  styleUrl: './sort-panel.scss',
})
export class SortPanel {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() sort = new EventEmitter<'asc' | 'desc' | 'none'>();

  selectedSort: 'asc' | 'desc' | null = null;

  apply(order: 'asc' | 'desc') {
    this.selectedSort = order;
    this.sort.emit(order);
    this.close.emit();
  }

  reset() {
    this.selectedSort = null; // clear UI
    this.sort.emit('none');
  }

  selectSOrt(order: 'asc' | 'desc') {
    this.selectedSort = order;
  }

  applysort() {
    if (this.selectedSort) {
      this.sort.emit(this.selectedSort);
      this.close.emit();
    }
  }
}
