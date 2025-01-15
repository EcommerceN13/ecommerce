import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: 'product_item', timestamps: true })
export class ProductItem extends Model {
    @Column({ type: DataType.NUMBER, allowNull: false })
    price: number;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @Column({ type: DataType.NUMBER, allowNull: false })
    product_id: number;
}