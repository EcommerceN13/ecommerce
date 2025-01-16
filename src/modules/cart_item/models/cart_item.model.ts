import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: 'cart_item', timestamps: true })
export class CartItem extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    cart_id: number;

    @Column({ type: DataType.BIGINT, allowNull: false })
    product_id: number;

    @Column({ type: DataType.BIGINT, allowNull: false })
    quantity: string;

    @Column({ type: DataType.BIGINT, allowNull: false })
    price: string;
}