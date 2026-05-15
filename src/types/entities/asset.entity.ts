export interface AssetEntity {
  brand_id: number;
  type_id: number;
  reseller_id: number;
  status_id: number;
  purchased_at: string;
  model: string;
  serial: string;
  warranty_months: number;
  price: number;

  id?: number;
}
