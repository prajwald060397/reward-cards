import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-panel.html',
  styleUrl: './category-panel.scss',
})
export class CategoryPanel {
  @Output() selectedChange = new EventEmitter<string[]>();
  @Input() clearTrigger = 0;

  categories = [
    {
      name: 'e-Voucher',
      expanded: false,
      selected: false,
      description: 'Digital vouchers that can be redeemed online or in-store.',
    },
    {
      name: 'Products',
      expanded: false,
      selected: false,
      description: 'Physical items and gift merchandise available for redemption.',
    },
    {
      name: 'Evergreen',
      expanded: false,
      selected: false,
      description: 'Always-available rewards that never go out of stock.',
    },
    {
      name: 'Fashion & Retail',
      expanded: false,
      selected: false,
      description: 'Clothing, retail accessories, and shopping rewards.',
    },
  ];

  ngOnChanges() {
    if (this.clearTrigger > 0) {
      this.categories.forEach((c) => (c.selected = false));
      this.selectedChange.emit([]);
    }
  }

  toggle(cat: any) {
    cat.expanded = !cat.expanded;
  }

  select(cat: any) {
    cat.selected = !cat.selected; // allow multiple

    const selected = this.categories.filter((c) => c.selected).map((c) => c.name);

    this.selectedChange.emit(selected);
  }
}
