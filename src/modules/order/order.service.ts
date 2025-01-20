import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { User } from '../user/models/user.model';
import { Address } from '../address';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderModel.create({ ...createOrderDto });
  }

  async findAll(offset: number, limit: number): Promise<{ rows: Order[]; count: number }> {
    return await this.orderModel.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: User,
          // attributes: ['id', 'name', 'email'],
        },
        {
          model: Address,
          // attributes: ['id', 'address', 'city', 'country'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          // attributes: ['id', 'name', 'email'],
        },
        {
          model: Address,
          // attributes: ['id', 'address', 'city', 'country'],
        },
      ],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      return null;
    }
    await order.update(updateOrderDto);
    return order;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.orderModel.destroy({
      where: { id },
    });
    return deleted > 0;
  }
}
