import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: 'color', timestamps: true })
export class Color extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    color_code: string;
}