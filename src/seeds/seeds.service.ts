import { Banner, Brand, Category, Product, User, UserRoles } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class SeedsService implements OnModuleInit {
    constructor(@InjectModel(User) private userModel: typeof User,
        @InjectModel(Category) private categoryModel: typeof Category,
        @InjectModel(Product) private productModel: typeof Product,
        @InjectModel(Brand) private brandModel: typeof Brand,
        @InjectModel(Banner) private bannerModel: typeof Banner
    ) { }

    async onModuleInit() {
        await this.seedUsers()
        await this.seedCategory(),
            await this.seedBrand()
        await this.seedProduct()
        await this.seedBanner()
    }

    async seedUsers(): Promise<void> {
        const usersCount = await this.userModel.count()

        if (usersCount == 0) {
            await this.userModel.create({
                fullname: "Abduqodir Team Lead",
                email: "abduqodiir@gmail.com",
                phone_number: "+998884891727",
                image: "/ahmad_aka.jpg_6f5b92c6-44a8-47ae-9101-972a2c8982b4.jpg",
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
                name: "Noubuklar",
                image: "/noutbuklar.png",
                icon: "/noutbuklar.svg",
            })
            await this.categoryModel.create({
                name: "Smartfonlar",
                image: "/smartfonlar.png",
                icon: "/smartfonlar.svg",
            })
            await this.categoryModel.create({
                name: "Konditsiyonerlar",
                image: "/konditsiyoner.png",
                icon: "/konditsiyoner.svg",
            })
            await this.categoryModel.create({
                name: "Televizorlar",
                image: "/televizor.png",
                icon: "/televizor.svg",
            })
            await this.categoryModel.create({
                name: "Muzlatgitchlar",
                image: "/muzlakich.png",
                icon: "/muzlakich.svg",
            })
            await this.categoryModel.create({
                name: "Kiryuvish mashinalari",
                image: "/kiryuvish_mashinasi.png",
                icon: "/kiryuvish_mashinasi.svg",
            })
            await this.categoryModel.create({
                name: "Chang yutkichlar",
                image: "/changyutkich.jpg",
                icon: "/changyutkich.svg",
            })
        }
    }

    async seedProduct(): Promise<void> {
        const productCount = await this.productModel.count()
        if (productCount == 0) {
            await this.productModel.create({
                name: "Смартфон Xiaomi 12 Lite 8/128Gb Қора kamera 48/68 px",
                category_id: 2,
                description: "The Samsung Galaxy S25 is expected to be a modern and high-tech smartphone. Its display will feature Dynamic AMOLED 2X technology for improved brightness and efficiency. The device will be powered by the latest Snapdragon or Exynos processors. The camera may include enhanced night mode and superior zoom capabilities. Its battery will support longer usage and faster charging technology.",
                nasiya: "6 oy",
                summary: "The Samsung Galaxy S25 is anticipated to deliver powerful performance with the latest processors and a stunning Dynamic AMOLED 2X display. It will also feature an upgraded camera system and a long-lasting battery with fast charging support.",
                price: 6999999,
                rating: 5,
                is_aksiya: true,
                brand_id: 3,
                image: "/airpods.jpg"
            })
        }
    }
    async seedBrand(): Promise<void> {
        const brandCount = await this.brandModel.count()

        if (brandCount == 0) {
            await this.brandModel.create({
                name: "Artel",
                image: "/artel.png"
            })
            await this.brandModel.create({
                name: "Artel",
                image: "/artel.png"
            })
            await this.brandModel.create({
                name: "Samsung",
                image: "/samsung_brand.png"
            })
            await this.brandModel.create({
                name: "Nokia",
                image: "/nokia.png"
            })
            await this.brandModel.create({
                name: "Mi",
                image: "/mi.png"
            })
            await this.brandModel.create({
                name: "Apple",
                image: "/apple.png"
            })
            await this.brandModel.create({
                name: "Vivo",
                image: "/vivo.png"
            })
            await this.brandModel.create({
                name: "Huwavei",
                image: "/huwavei.png"
            })

        }
    }

    async seedBanner(): Promise<void> {
        const bannerCount = await this.bannerModel.count()
        if (bannerCount == 0) {
            await this.bannerModel.create({
                product_id: 1,
                description: "Orginallik va qulay narxni o'zida jamlagan  Xiaomi 12 Mi Laite  siz uchun eng yaxshi arziydigan takliflarimizdan biridir!ii",
                image: "banner_image1.png",
                name: "Siz kutgan Xiaomi 12 Mi Laite"
            })
            await this.bannerModel.create({
                product_id: 1,
                description: "Orginallik va qulay narxni o'zida jamlagan  Xiaomi 12 Mi Laite  siz uchun eng yaxshi arziydigan takliflarimizdan biridir!ii",
                image: "banner_image1.png",
                name: "Siz kutgan Xiaomi 12 Mi Laite"
            })
            await this.bannerModel.create({
                product_id: 1,
                description: "Orginallik va qulay narxni o'zida jamlagan  Xiaomi 12 Mi Laite  siz uchun eng yaxshi arziydigan takliflarimizdan biridir!ii",
                image: "banner_image1.png",
                name: "Siz kutgan Xiaomi 12 Mi Laite"
            })
        }
    }
}