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
    type: DataType.ENUM('3 oy', '6 oy', '12 oy'),
    allowNull: false,
  })
  nasiya: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  summary: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  //   @ForeignKey(()=>Brand)
  @Column({ type: DataType.BIGINT, allowNull: false })

  brand_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @BelongsTo(() => Category)
  category: Category;
}
