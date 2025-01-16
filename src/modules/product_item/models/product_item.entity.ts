import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { ProductConfiguration } from "src/modules/product_configuration";


@Table({ tableName: 'product_item', timestamps: true })
export class ProductItem extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    price: number;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @Column({ type: DataType.BIGINT, allowNull: false })
    product_id: number;

    @HasMany(() => ProductConfiguration)
    configurations: ProductConfiguration[];
}
