import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";
import { UserService } from "./services/user.service";
import { RoleService } from "./services/role.service";
import { UserController } from "./controllers/user.controller";
import { RoleController } from "./controllers/role.controller";
import { PermissionService } from "./services/permissions.service";
import { PermissionController } from "./controllers/permission.controller";
import { Permission } from "src/models/permissions.model";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission])],
    controllers: [ UserController, RoleController, PermissionController ],
    providers: [UserService, RoleService, PermissionService],
    exports: [UserService, RoleService, PermissionService]
})
export class CommonModule{}