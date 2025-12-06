import { Component, Input } from '@angular/core';
import { Reward } from '../../models/reward.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reward-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reward-card.html',
  styleUrl: './reward-card.scss',
})
export class RewardCard {
  @Input() item!: Reward;

  get img() {
    return this.item.display_img_url || 'assets/placeholder.jpg';
  }
}
