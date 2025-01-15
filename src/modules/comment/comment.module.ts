import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comment } from "./models";

@Module({
    imports: [SequelizeModule.forFeature([Comment])],
    providers: [],
    controllers: []
})

export class CommentModule { }