import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { ProductConfiguration } from "src/modules/product_configuration";


@Table({ tableName: 'variation_option', timestamps: true })
export class VariationOption extends Model {
    @Column({ type: DataType.BIGINT, allowNull: false })
    variation_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    value: string;

    @HasMany(() => ProductConfiguration)
    configurations: ProductConfiguration[];
}
