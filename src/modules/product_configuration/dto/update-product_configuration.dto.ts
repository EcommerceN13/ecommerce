import { PartialType } from "@nestjs/swagger";
import { CreateProductConfigurationDto } from "./create-product_configuration.dto";


export class UpdateProductConfigurationDto extends PartialType(CreateProductConfigurationDto)  {
    readonly product_item_id?: number;
    readonly variation_option_id?: number;
  }