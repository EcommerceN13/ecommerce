import { appConfig, databaseConfig } from '@config';
import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { ModelCtor } from 'sequelize-typescript';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import {
  Cart,
  CartItem,
  CartItemModule,
  CartModule,
  Category,
  CategoryModule,
  Comment,
  CommentModule,
  FileModule,
  Like,
  LikeModule,
  Order,
  OrderItems,
  OrderItemsModule,
  OrderModule,
  Product,
  ProductConfiguration,
  ProductConfigurationModule,
  ProductItem,
  ProductItemModule,
  ProductModule,
  User,
  UserModule,
  Variation,
  VariationModule,
  VariationOption,
  VariationOptionModule,
} from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import { Address } from './modules/address/models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: './uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'ashyosite',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get<string>('databaseConfig.host'),
            port: config.get<number>('databaseConfig.port'),
            username: config.get<string>('databaseConfig.user'),
            password: config.get<string>('databaseConfig.password'),
            database: config.get<string>('databaseConfig.dbname'),
            models: [
              User,
              Like,
              Comment,
              Cart,
              CartItem,
              Order,
              OrderItems,
              ProductConfiguration,
              ProductItem,
              Variation,
              VariationOption,
              Address,
              Product,
              Category,
            ] as ModelCtor[],
            // sync: { force: true },
            synchronize: true,
            logging: console.log,
            autoLoadModels: true,
          } as SequelizeModuleOptions;
        } catch (error) {
          console.error(
            'Error occurred while connecting to the database',
            error,
          );
          throw error;
        }
      }
    }),
    UserModule,
    AddressModule,
    AuthModule,
    FileModule,
    LikeModule,
    CommentModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemsModule,
    ProductConfigurationModule,
    ProductItemModule,
    VariationModule,
    VariationOptionModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    // {
    //   useClass: CheckAuthGuard,
    //   provide: APP_GUARD,
    // },
    // {
    //   useClass: CheckRoleGuard,
    //   provide: APP_GUARD,
    // },
  ],
})
export class AppModule { }
