import { Module } from "@nestjs/common"
import { SeedsService } from "./seeds.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category, Product, User } from "@modules";
@Module({
    imports: [SequelizeModule.forFeature([User,Category,Product])],
    providers: [SeedsService]
})
export class SeedsModule { }