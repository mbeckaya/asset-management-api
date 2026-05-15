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