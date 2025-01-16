import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Category } from 'src/modules/category';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  category_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({
    type: DataType.ENUM('Tolangan', 'Tolanmagan', 'On proccess'),
    allowNull: false,
  })
  nasiya: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  summary: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  brand_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  image: string;

  @BelongsTo(() => Category)
  category: Category;
}