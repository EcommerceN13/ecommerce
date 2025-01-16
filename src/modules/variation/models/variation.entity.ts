import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
import { Category } from 'src/modules/category';

@Table({ tableName: 'variation', timestamps: true })
export class Variation extends Model {
  
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    color: string;
  @ForeignKey(() => Category)
  @Column({ type: DataType.BIGINT, allowNull: false })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;
}