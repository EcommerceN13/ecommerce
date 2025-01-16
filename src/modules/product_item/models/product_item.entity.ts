import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
import { Product } from 'src/modules/product/models/product.model';

@Table({ tableName: 'product_item', timestamps: true })
export class ProductItem extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;
}