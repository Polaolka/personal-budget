import { Category } from '@models/Category.model';
import { Transaction } from '@models/Transaction.model';

interface CategoryResponse extends Category {
  id: number;
}

export interface CreatedTransaction extends Transaction {
  categoryId: CategoryResponse;
  categoryName: string;
}
