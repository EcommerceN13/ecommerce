import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models";
import { UserService } from "./user.service";
import { FileService } from "../file";
import { UserController } from "./user.controller";
import { Address } from "../address";


@Module({
    imports: [SequelizeModule.forFeature([User, Address])],
    providers: [UserService, FileService],
    controllers: [UserController]
})

export class UserModule { }