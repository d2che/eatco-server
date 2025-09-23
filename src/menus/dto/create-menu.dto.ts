export class CreateMenuDto {
  name: string;
  imageUrl: string;
  officialPrice: number;
  isPopular?: boolean;
  brandId: number;
}
