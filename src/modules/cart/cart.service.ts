import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cart } from "./models";
import { CreateCartDto, UpdateCartDto } from "./dtos";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart) private cartModel: typeof Cart) { }

    async getAllCarts(): Promise<Cart[]> {
        return await this.cartModel.findAll()
    }

    async getSingleCart(id: number): Promise<Cart> {
        return this.cartModel.findOne({
            where: { id }
        })
    }

    async createCart(payload: CreateCartDto): Promise<{ message: string; new_cart: Cart }> {
        const new_cart = await this.cartModel.create({
            user_id: payload.user_id,
            product_id: payload.product_id,
            count: payload.count
        })

        return {
            message: "Cart created successfully!",
            new_cart
        }
    }

    async updateCart(id: number, payload: UpdateCartDto): Promise<{ message: string, updatedCart: Cart }> {
        await this.cartModel.update(payload, { where: { id } })

        const updatedCart = await this.cartModel.findOne({ where: { id } })

        if (!updatedCart) throw new Error(`Cart with ID ${id} not found`);

        return {
            message: "Cart updated successfully",
            updatedCart
        }
    }

    async deleteCart(id: number): Promise<{ message: string }> {
        const cart = await this.cartModel.findByPk(id)
        if (!cart) return { message: `${id} raqamli Cart topilmadi!!!` }
        await cart.destroy()
        return {
            message: "Cart deleted successfully"
        }
    }
}