import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user";

@Table({tableName:"like",timestamps:true})
export class Like extends Model {

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false,onDelete: "CASCADE", onUpdate: "CASCADE"})
    user_id: number;

    @Column({type: DataType.INTEGER, allowNull: false,onDelete: "CASCADE", onUpdate: "CASCADE"})
    product_id: number
}