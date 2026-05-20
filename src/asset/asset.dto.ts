export interface AssetDto {
  id: number;
  brand: string;
  type: string;
  reseller: string;
  purchasedAt: string;
  model: string;
  serial: string;
  warrantyMonths: number;
  price: number;

  brandId?: number;
  typeId?: number;
  resellerId?: number;
}