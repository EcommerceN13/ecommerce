import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "cart",timestamps:true})
export class Cart extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false, })
    user_id: number;

    @Column({ type: DataType.BIGINT, allowNull: false, })
    product_id: number

    @Column({ type: DataType.BIGINT, allowNull: false, })
    count: number
}