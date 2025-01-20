import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./models";
import { ProductService } from "./product.service";
import { FileService } from "../file";
import { ProductController } from "./product.controller";

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    providers: [ProductService, FileService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule { }