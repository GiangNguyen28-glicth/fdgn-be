import { CategoryEntity } from "../../../../infra";

export class CreateCategoryDTO implements Partial<CategoryEntity> {
    name?: string;
    level?: number;
    parent_id?: string;

}
