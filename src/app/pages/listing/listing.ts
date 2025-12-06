import { Component } from '@angular/core';
import { REWARD_LIST } from '../../data/rewards';
import { Reward } from '../../models/reward.model';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { CategoryPanel } from '../../components/category-panel/category-panel';
import { RewardCard } from '../../components/reward-card/reward-card';
import { SortPanel } from '../../components/sort-panel/sort-panel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing',
  imports: [CommonModule, Header, Footer, CategoryPanel, RewardCard, SortPanel, FormsModule],
  templateUrl: './listing.html',
  styleUrl: './listing.scss',
})
export class Listing {
  rewards: Reward[] = [...REWARD_LIST];
  filteredRewards: Reward[] = [...this.rewards];

  sortPanelOpen = false;

  appliedFilters: string[] = [];
  clearCounter = 0;

  pageSize = 10;
  currentPage = 1;
  pagedRewards: Reward[] = [];
  pageSizes = [5, 10, 15, 20];

  clearTrigger = 0;
  
  ngOnInit() {
    this.updatePagedData();
  }

  search(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredRewards = this.rewards.filter((r) => r.name.toLowerCase().includes(value));

    this.currentPage = 1;
    this.updatePagedData();
  }

  applySort(order: 'asc' | 'desc' | 'none') {
    if (order === 'none') {
      // restore original list
      this.filteredRewards = [...this.rewards];
      this.currentPage = 1;
      this.updatePagedData();
      return;
    }

    this.filteredRewards = [...this.filteredRewards].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    this.updatePagedData();
  }

  updateAppliedFilters(selected: string[]) {
    this.appliedFilters = [...selected];
    this.applyFilters();
  }

  applyFilters() {
    if (this.appliedFilters.length === 0) {
      this.filteredRewards = [...this.rewards];
    } else {
      this.filteredRewards = this.rewards.filter((r) => this.appliedFilters.includes(r.category));
    }

    this.currentPage = 1;
    this.updatePagedData();
  }

  removeFilter(name: string) {
    this.appliedFilters = this.appliedFilters.filter((f) => f !== name);
    this.applyFilters();

    this.clearCounter++;
  }

  clearFilters() {
    this.appliedFilters = [];
    this.applyFilters();

    this.clearCounter++;
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedRewards = this.filteredRewards.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updatePagedData();
  }

  get totalPages() {
    return Math.ceil(this.filteredRewards.length / this.pageSize);
  }
}
