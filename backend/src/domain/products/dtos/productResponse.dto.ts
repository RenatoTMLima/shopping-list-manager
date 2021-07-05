export interface ProductResponseDTO {
  id: number;
  name: string;
  categoriesId: number;
  price: number;
  categories: {
    id: number;
    name: string;
  };
}
