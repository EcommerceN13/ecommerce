import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

@Table({ tableName: 'variation_option', timestamps: true })
export class VariationOption extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    variation_id: number;

    @Column({ type: DataType.STRING, allowNull: false})
    value: string;
}