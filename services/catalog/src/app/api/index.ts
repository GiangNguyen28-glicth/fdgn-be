import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

export * from './category';
export * from './product';
export const ModuleServices = [ProductService, CategoryService];
export const ModuleControllers = [ProductController, CategoryController];
