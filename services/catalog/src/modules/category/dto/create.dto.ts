import { Category } from '@fdgn/share-domain';

export class CreateCategoryDTO implements Partial<Category> {
    name?: string;
    level?: number;
    parent_id?: string;

}
