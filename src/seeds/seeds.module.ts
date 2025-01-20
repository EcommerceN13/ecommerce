import { Module } from "@nestjs/common"
import { SeedsService } from "./seeds.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Brand, Category, Product, User } from "@modules";
@Module({
    imports: [SequelizeModule.forFeature([User,Category,Product,Brand])],
    providers: [SeedsService]
})
export class SeedsModule { }