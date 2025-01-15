import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName:"banner",timestamps:true})
export class Banner extends Model {
    @Column
    title:string;

    @Column
    description:string;

    @Column
    image: string
}