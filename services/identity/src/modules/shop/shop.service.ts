import { Inject, Injectable } from '@nestjs/common';

import { IResponse } from '@fdgn/common';
import { IShop, IUser, RoleType } from '@fdgn/share-ecm';
import { FilterTypeOrmBuilder, TypeOrmService } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { IShopRepo } from '../../domain';
import { ShopEntity } from '../../infra';
import { RoleService } from '../role';
import { UserService } from '../user';
import { CreateShopDTO, FilterGetOneShop } from './dto';

@Injectable()
export class ShopService {
  constructor(
    @Inject(REPO.SHOP) private shopRepo: IShopRepo,
    private roleService: RoleService,
    private userService: UserService,
    private typeOrmService: TypeOrmService,
  ) {}

  async create(dto: CreateShopDTO, current_user: IUser): Promise<IResponse> {
    const query_runner = await this.typeOrmService.getConnection();
    try {
      const user = await this.userService.findOne({ id: current_user.id });
      const role = await this.roleService.findOne({ name: RoleType.SHOP });
      dto['user'] = user;
      const shop = await this.shopRepo.insert({ entity: dto, session: query_runner });
      user.roles.push(role);
      await this.userService.updateOne({
        filters: { id: user.id },
        entity: { roles: user.roles },
        session: query_runner,
      });
      await this.shopRepo.save({ entity: shop, session: query_runner });
      await query_runner.commitTransaction();
      return {
        success: true,
        message: shop.id.toString(),
      };
    } catch (error) {
      await query_runner.rollbackTransaction();
      throw error;
    }
  }

  async findOne(filters_query: FilterGetOneShop): Promise<ShopEntity> {
    const { filters } = new FilterTypeOrmBuilder<IShop>().setFilterItem('id', '$eq', filters_query?.id).buildQuery();
    return await this.shopRepo.findOne({ filters });
  }
}
