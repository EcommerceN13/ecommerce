import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Like } from "./models";
import { CreateLikeDto, UpdateLikeDto } from "./dtos";

@Injectable()
export class LikeService {
    constructor(@InjectModel(Like) private liekModel: typeof Like) { }

    async getAllLikes(): Promise<Like[]> {
        return await this.liekModel.findAll()
    }

    async getSingleLike(id: number): Promise<Like> {
        return this.liekModel.findOne({
            where: { id }
        })
    }

    async createLike(payload: CreateLikeDto): Promise<{ message: string; new_like: Like }> {
        const new_like = await this.liekModel.create({
            user_id: payload.user_id,
            product_id: payload.product_id
        })

        return {
            message: "Like created successfully!",
            new_like
        }
    }

    async updateLike(id: number, payload: UpdateLikeDto): Promise<{ message: string, updatedLike: Like }> {
        await this.liekModel.update(payload, { where: { id } })

        const updatedLike = await this.liekModel.findOne({ where: { id } })

        if (!updatedLike) throw new Error(`Like with ID ${id} not found`);

        return {
            message: "Like updated successfully",
            updatedLike
        }

    }

    async deleteLike(id: number): Promise<{ message: string }> {
        const like = await this.liekModel.findByPk(id)
        if (!like) return { message: `${id} raqamli Like topilmadi!!!` }
        await like.destroy()
        return {
            message: "Like deleted successfully"
        }

    }
}