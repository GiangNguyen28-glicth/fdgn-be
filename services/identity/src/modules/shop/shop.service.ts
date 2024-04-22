import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { DBS_TYPE, FilterBuilder, IResponse } from '@fdgn/common';
import { TypeOrmService } from '@fdgn/typeorm';
import { IShopRepo, RoleType, SHOP_PROVIDER, Shop, User } from '@fdgn/share-domain';

import { RoleService } from '../role';
import { UserService } from '../user';
import { CreateShopDTO, FilterGetOneShop } from './dto';

const dbsType: DBS_TYPE = DBS_TYPE.TYPE_ORM;
@Injectable()
export class ShopService {
  constructor(
    @Inject(SHOP_PROVIDER.TYPE_ORM_REPO) private shopRepo: IShopRepo,
    private roleService: RoleService,
    private userService: UserService,
    private typeOrmService: TypeOrmService,
  ) {}

  async create(dto: CreateShopDTO, current_user: User): Promise<IResponse> {
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
      // throw new Error('ABC');
      await this.shopRepo.save({ entity: shop, session: query_runner });
      await query_runner.commitTransaction();
      return {
        success: true,
        message: shop.id.toString(),
      };
    } catch (error) {
      console.log('Error2:', error);
      await query_runner.rollbackTransaction();
      throw error;
    }
  }

  async findOne(filtersQuery: FilterGetOneShop): Promise<Shop> {
    const { filters } = new FilterBuilder<Shop>()
      .getInstance(dbsType)
      .setFilterItem('id', '$eq', filtersQuery?.id)
      .buildQuery();
    return await this.shopRepo.findOne({ filters });
  }
}
