import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Permission } from "src/models/permissions.model";
import { RolePermission } from "src/models/role-permission.model";
import { Role } from "src/models/role.model";
import { UserRole } from "src/models/user-role.model";
import { User } from "src/models/user.model";

export const getDatabaseConfig = ():TypeOrmModuleOptions =>{
    return {
        type: process.env.DB_TYPE=='mysql'?"mysql":'mariadb',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        entities: [ User, Role, UserRole, Permission, RolePermission ],
        synchronize: true,
    }
}