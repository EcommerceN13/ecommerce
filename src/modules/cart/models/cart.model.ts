import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { Product } from '../../product/models/product.model';
  
  @Table({ tableName: 'cart', timestamps: true })
  export class Cart extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    user_id: number;
  
    @ForeignKey(() => Product)
    @Column({ type: DataType.BIGINT, allowNull: false })
    product_id: number;
  
    @Column({ type: DataType.BIGINT, allowNull: false })
    count: number;
  
    @BelongsTo(() => Product)
    product: Product;
  }