import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { Product } from "src/modules/product/models/product.model";
  import { User } from "src/modules/user/models/user.model";
  // import { Address } from "src/modules/address/models/address.model";
  
  export enum OrderStatus {
    processing = "processing",
    delivered = "delivered",
    denied = "denied",
  }
  
  @Table({ tableName: "order", timestamps: true })
  export class Order extends Model {
    @ForeignKey(() => Product)
    @Column({ type: DataType.BIGINT, allowNull: false })
    product_id: number;
  
    @BelongsTo(() => Product)
    product: Product;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false })
    user_id: number;
  
    @BelongsTo(() => User)
    user: User;
  
    // @ForeignKey(() => Address)
    // @Column({ type: DataType.BIGINT, allowNull: false })
    // address_id: number;
  
    // @BelongsTo(() => Address)
    // address: Address;
  
    @Column({
      type: DataType.ENUM,
      values: [OrderStatus.delivered, OrderStatus.denied, OrderStatus.processing],
      allowNull: false,
    })
    status: OrderStatus;
  }  