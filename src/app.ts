import { appConfig, databaseConfig } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User } from './modules/users/model';
import { UserModule } from '@modules';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: "./uploads",
      rootPath: "./uploads"
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get<string>('databaseConfig.host'),
            port: config.get<number>('databaseConfig.port'),
            username: config.get<string>('databaseConfig.user'),
            password: config.get<string>('databaseConfig.password'),
            database: config.get<string>('databaseConfig.dbname'),
            models: [User],
            // sync:{force:true},
            synchronize: true,
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.error('Error occurred while connecting to the database', error);
          throw error;
        }
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }