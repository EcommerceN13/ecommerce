import {
    Table,
    Model,
    Column,
    DataType,
    HasMany,

  } from 'sequelize-typescript';
import { Product } from 'src/modules/product';

@Table({ tableName: 'categories', timestamps: true})
export class Category extends Model{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;
    
    @Column({type: DataType.TEXT, allowNull: false, unique: true})
    name: string;
    
    @Column({type: DataType.TEXT, allowNull: false})
    image: string;
    
    @Column({type: DataType.TEXT, allowNull: false})
    icon: string;

    @HasMany(() => Product)
    product: Product[];
}