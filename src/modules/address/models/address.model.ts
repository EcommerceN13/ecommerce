import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user';

@Table({ tableName: "addres", timestamps: true })
export class Address extends Model {
  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  region_id: number;

  @BelongsTo(() => Address)
  region: Address;

  @HasMany(() => Address)
  cities: Address[];

  @Column({
    type: DataType.ENUM('REGION', 'CITY', 'DISTRICT'),
    allowNull: false,
    defaultValue: 'REGION',
  })
  type: 'REGION' | 'CITY' | 'DISTRICT';

  @Column({ type: DataType.STRING, allowNull: false })
  city: string

  // To'liq manzilni olish uchun Misol Viloyat va shahar kiritgandan keyin kocha yoki mahallani olish uchun
  @Column({ type: DataType.STRING, allowNull: false })
  street: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}