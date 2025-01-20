import { Category, Product, User, UserRoles } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class SeedsService implements OnModuleInit {
    constructor(@InjectModel(User) private userModel: typeof User,
        @InjectModel(Category) private categoryModel: typeof Category,
        @InjectModel(Product) private productModel: typeof Product
    ) { }

    async onModuleInit() {
        await this.seedUsers()
        await this.seedCategory(),
        await this.seedProduct()
    }

    async seedUsers(): Promise<void> {
        const usersCount = await this.userModel.count()

        if (usersCount == 0) {
            await this.userModel.create({
                fullname: "Abduqodir Teamlead",
                email: "abduqodiir@gmail.com",
                phone_number: "+998884891727",
                image: "localhost:3000/uploads/ahmad_aka.jpg_6f5b92c6-44a8-47ae-9101-972a2c8982b4.jpg",
                password: "password123",
                is_verified: true,
                role: UserRoles.admin
            })
        }
    }

    async seedCategory(): Promise<void> {
        const categoryCount = await this.categoryModel.count()
        if (categoryCount == 0) {
            await this.categoryModel.create({
                name: "telephones",
                image: "localhost:3000/uploads/galaxy_s24_samsung_1705488155097.webp",
                icon: ""
            })
        }
    }

    async seedProduct(): Promise<void> {
        const productCount = await this.productModel.count()
        if (productCount == 0) {
            await this.productModel.create({
                name: "S25",
                category_id: 1,
                description: "The Samsung Galaxy S25 is expected to be a modern and high-tech smartphone. Its display will feature Dynamic AMOLED 2X technology for improved brightness and efficiency. The device will be powered by the latest Snapdragon or Exynos processors. The camera may include enhanced night mode and superior zoom capabilities. Its battery will support longer usage and faster charging technology.",
                nasiya: "6 oy",
                summary: "The Samsung Galaxy S25 is anticipated to deliver powerful performance with the latest processors and a stunning Dynamic AMOLED 2X display. It will also feature an upgraded camera system and a long-lasting battery with fast charging support.",
                price: 12000,
                brand_id: 1,
                image: "localhost:3000/uploads/product_image.jpg"
            })
        }
    }
}