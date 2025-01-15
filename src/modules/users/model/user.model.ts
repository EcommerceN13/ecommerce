import { IsOptional } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum UserRoles {
  user = 'USER',
  admin = 'ADMIN',
}


@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.ENUM('admin', 'user'),
    defaultValue: 'user',
  })
  role: string;
}
