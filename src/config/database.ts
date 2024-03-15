import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getDatabaseConfig = ():TypeOrmModuleOptions =>{
    return {
        type: process.env.DB_TYPE=='mysql'?"mysql":'mariadb',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        entities: [],
        synchronize: true,
    }
}