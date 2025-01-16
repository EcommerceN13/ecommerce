import { Table, Model, Column, DataType, HasMany, Unique } from "sequelize-typescript";
import { Address } from "src/modules/address/models/address.model";


export enum UserRoles {
    user = 'USER',
    admin = 'ADMIN',
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    fullname: string;

    @Column({ type: DataType.STRING, allowNull: false, unique:true })
    email: string;

    @Column({ type: DataType.BIGINT, allowNull: true })
    phone_number ?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({
        type: DataType.ENUM,
        values: [UserRoles.admin, UserRoles.user],
        allowNull: false,
        defaultValue: UserRoles.user,
    })
    role ?: UserRoles;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue:false })
    is_verified: boolean;

    // Address ga bog'lanish uchun
    @HasMany(() => Address)
    movies: Address[];
}