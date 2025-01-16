import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { Comment } from "./models";
import { CreateCommentDto, UpdateCommentDto } from "./dtos";

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly service: CommentService) { }

    @Get()
    @ApiOperation({ summary: "Get all comments" })
    async getAllComments(): Promise<Comment[]> {
        return this.service.getAllComments()
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single Comment by ID" })
    async getSingleComment(@Param("id") id: string): Promise<Comment> {
        return this.service.getSingleComment(+id);
    }

    @Post('/add')
    @ApiOperation({ summary: "Create a new comment" })
    async createComment(@Body() payload: CreateCommentDto) {
        return this.service.createComment(payload);
    }

    @Put("/update/:id")
    @ApiOperation({ summary: "Update a comment by ID" })
    async updateComment(@Param("id") id: string, @Body() payload: UpdateCommentDto) {
        return this.service.updateComment(+id, payload);
    }

    @Delete("/delete/:id")
    @ApiOperation({ summary: "Delete a comment by ID" })
    async deleteComment(@Param("id") id: string) {
        const deleted = await this.service.deleteComment(+id);
        if (!deleted) throw new NotFoundException(`Comment with ID ${id} not found`);
        return { message: "Comment deleted successfully" };
    }
}