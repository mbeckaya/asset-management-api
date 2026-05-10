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

export interface AssetView {
  id: number;
  brand: string;
  type: string;
  reseller: string;
  status: string;
  purchasedAt: string;
  model: string;
  serial: string;
  warrantyMonths: number;
  price: number;

  brandId?: number;
  typeId?: number;
  resellerId?: number;
  statusId?: number;
}