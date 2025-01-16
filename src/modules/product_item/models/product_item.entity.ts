import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: 'variation', timestamps: true })
export class Variation extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    category_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    color: string;
}