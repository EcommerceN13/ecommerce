import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

@Table({ tableName: 'variation_option', timestamps: true })
export class VaritionOption extends Model {
    @Column({ type: DataType.NUMBER, allowNull: false })
    variation_id: number;

    @Column({ type: DataType.STRING, allowNull: false})
    value: string;
}