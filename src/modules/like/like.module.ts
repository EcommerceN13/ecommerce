import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Like } from "./models";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";

@Module({
    imports: [SequelizeModule.forFeature([Like])],
    providers: [LikeService],
    controllers: [LikeController]
})

export class LikeModule { }