import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Account } from "./src/account/entities/account.entity";
import { DataSource } from "typeorm";
import { Logger } from "@nestjs/common";

config();

const configService = new ConfigService()

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [Account],
        migrations: [__dirname + 'dist/src/database/migrations/**/*{.ts,.js}'],
        logging: true,
        logger: 'simple-console',
})