import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Cart } from "./models";

@Module({
    imports: [SequelizeModule.forFeature([Cart])],
    providers: [],
    controllers: []
})

export class CartModule { }