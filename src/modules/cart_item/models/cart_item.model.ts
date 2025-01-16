import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
import { Cart } from 'src/modules/cart/models';
import { Product } from 'src/modules/product/models/product.model';

@Table({ tableName: 'cart_item', timestamps: true })
export class CartItem extends Model {
  @ForeignKey(() => Cart)
  @Column({ type: DataType.BIGINT, allowNull: false })
  cart_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;
}