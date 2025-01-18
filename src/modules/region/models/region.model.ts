import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';


@Table({ tableName: "region", timestamps: true })
export class Region extends Model {

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({
    type: DataType.ENUM('REGION', 'CITY', 'DISTRICT'),
    allowNull: false,
    defaultValue: 'REGION',
  })
  type: 'REGION' | 'CITY' | 'DISTRICT';

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  region_id: number | null;

  @BelongsTo(() => Region)
  parent: Region;

  @HasMany(() => Region)
  children: Region[];
}