import { Category } from '@models/Category.model';

export interface CreatedCategoryResponse extends Category {
  id: number;
}
