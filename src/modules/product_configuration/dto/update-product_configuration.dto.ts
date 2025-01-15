import { PartialType } from '@nestjs/swagger';
import { CreateProductConfigurationDto } from './create-product_configuration.dto';

export class UpdateProductConfigurationDto extends PartialType(CreateProductConfigurationDto) {}
