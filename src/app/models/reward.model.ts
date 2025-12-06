export interface Reward {
  pk: number;
  name: string;
  points: number;
  display_img_url: string;
  quantity: number | null;
  valid_until: string;
  low_quantity: number;
  category: string;
}
