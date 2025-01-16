import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'categories', timestamps: true})
export class Category extends Model{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;
    
    @Column({type: DataType.TEXT, allowNull: false, unique: true})
    name: string;
    
    @Column({type: DataType.TEXT, allowNull: false, unique: true})
    image: string;
    
    @Column({type: DataType.TEXT, allowNull: false, unique: true})
    icon: string;

    // @HasMany(()=> Product)
    // products: Product[]
}
