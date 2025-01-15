import { Column, DataType, Model } from "sequelize-typescript";

export class Address extends Model {
    @Column({type: DataType.STRING})
    id: string;
}
