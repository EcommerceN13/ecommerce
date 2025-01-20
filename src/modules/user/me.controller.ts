import { Controller, Get, Param, Patch, Delete, Body, HttpException, HttpStatus } from "@nestjs/common";
import { MeService } from "./me.service";
import { User } from "./models";

@Controller('me')
export class MeController {
    constructor(private readonly meService: MeService) {}

    @Get(':id')
    async getUser(@Param('id') id: number) {
        const user = await this.meService.getUserById(id);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() updateData: Partial<User>) {
        try {
            const updatedUser = await this.meService.updateUser(id, updateData);
            if (!updatedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            return updatedUser;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
