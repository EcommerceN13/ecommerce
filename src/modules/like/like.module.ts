import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Like } from "./models";

@Module({
    imports: [SequelizeModule.forFeature([Like])],
    providers: [],
    controllers: []
})

export class LikeModule { }