export class CreateBrandDto {
  name: string;
  logoUrl: string;
  cheapestMenuPrice: number;
  maxDiscount: number;
  isPopular?: boolean;
  isLowCost?: boolean;
}
