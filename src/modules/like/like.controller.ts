import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LikeService } from "./like.service";
import { Like } from "./models";
import { CreateLikeDto, UpdateLikeDto } from "./dtos";

@ApiTags('like')
@Controller('like')
export class LikeController {
    constructor(private readonly service: LikeService) { }

    @Get()
    @ApiOperation({ summary: "Get all likes" })
    async getAllLikes(): Promise<Like[]> {
        return this.service.getAllLikes()
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single LIKE by ID" })
    async getSingleLike(@Param("id") id: string): Promise<Like> {
        return this.service.getSingleLike(+id);
    }

    @Post('/add')
    @ApiOperation({ summary: "Create a new like" })
    async createLike(@Body() payload: CreateLikeDto) {
        return this.service.createLike(payload);
    }

    @Put("/update/:id")
    @ApiOperation({ summary: "Update a like by ID" })
    async updateLike(@Param("id") id: string, @Body() payload: UpdateLikeDto) {
        return this.service.updateLike(+id, payload);
    }

    @Delete("/delete/:id")
    @ApiOperation({ summary: "Delete a like by ID" })
    async deleteLike(@Param("id") id: string) {
        const deleted = await this.service.deleteLike(+id);
        if (!deleted) throw new NotFoundException(`Like with ID ${id} not found`);
        return { message: "Like deleted successfully" };
    }
}