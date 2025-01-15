import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

@Table({ tableName: 'product_configuration', timestamps: true })
export class ProductConfiguration extends Model {
    @Column({ type: DataType.NUMBER, allowNull: false })
    product_item_id: number;

    @Column({ type: DataType.NUMBER, allowNull: false})
    variation_option_id: number;
}