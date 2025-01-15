import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: 'cart_item', timestamps: true })
export class CartItem extends Model {
    @Column({ type: DataType.NUMBER, allowNull: false })
    cart_id: number;

    @Column({ type: DataType.NUMBER, allowNull: false })
    product_id: number;

    @Column({ type: DataType.NUMBER, allowNull: false })
    quantity: string;

    @Column({ type: DataType.NUMBER, allowNull: false })
    price: string;
}