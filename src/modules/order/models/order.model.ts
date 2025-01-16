import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

export enum OrderStatus {
    processing = "processing",
    delivered = "delivered",
    denied = "denied",
}

@Table({ tableName: 'order', timestamps: true })
export class Order extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    product_id: number;

    @Column({ type: DataType.ENUM,values: [OrderStatus.delivered,OrderStatus.denied,OrderStatus.processing],allowNull: false })
    status: OrderStatus;

    @Column({ type: DataType.BIGINT, allowNull: false })
    user_id: number;

    @Column({ type: DataType.BIGINT, allowNull: false })
    address_id: number;
}
