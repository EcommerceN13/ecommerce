import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:"like",timestamps:true})
export class Like extends Model {
    @Column({type: DataType.BIGINT, allowNull: false,})
    user_id: number;

    @Column({type: DataType.BIGINT, allowNull: false,})
    product_id: number
}