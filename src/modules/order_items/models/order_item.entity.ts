import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'order_items', timestamps: true })
export class OrderItems extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false })
  order_id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  price: number;
}
