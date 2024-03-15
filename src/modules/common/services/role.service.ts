import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/models/permissions.model";
import { Role } from "src/models/role.model";
import { FindManyOptions, In, Like, Repository } from "typeorm";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly _m_Role: Repository<Role>,
        @InjectRepository(Permission) private readonly _m_Permission: Repository<Permission>) { }
    async findAndCount(page: number = 1, perPage: number = 10, filterParams: { search?: string, is_active?: boolean }): Promise<{data: Role[], total: number}> {
        const options: FindManyOptions<Role> = {
            take: perPage,
            skip: perPage * (page - 1),
        };
        if (filterParams && filterParams.search && filterParams.is_active != null) {
            options.where = [

            ];
            options.where.push({ name: Like(`%${filterParams.search}%`) })

            if (filterParams.is_active != null) {
                options.where.push({ is_active: filterParams.is_active });
            }
        }
        const [data, total] = await this._m_Role.findAndCount(options);
        return {data, total};
    }

    async findAll():Promise<Role[]>{
        return await this._m_Role.find();
    }

    async findById(id: number): Promise<Role | null> {
        return await this._m_Role.findOne({ where: { id: id } });
    }

    async findPermissionByRoleId(id: number): Promise<Role | null> {
        return await this._m_Role.findOne({ where: { id: id }, relations: ['permissions'] });
    }

    async assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<Role | false> {
        const role = await this._m_Role.findOne({ where: { id: roleId } });
        if (!role) {
            return false;
        }

        const permissions = await this._m_Permission.find({ where: { id: In(permissionIds) } });
        if (permissions.length !== permissionIds.length) {
            return false;
        }

        role.permissions = permissions;
        await this._m_Role.save(role);
    }

    async create(role: Partial<Role>): Promise<Role> {
        const newRole = this._m_Role.create(role);
        return await this._m_Role.save(newRole);
    }

    async update(id: number, updateRoleDto: Partial<Role>): Promise<Role | false> {
        const role = await this._m_Role.findOne({ where: { id: id } });
        if (!role) {
            return false;
        }

        Object.assign(role, updateRoleDto);
        return await this._m_Role.save(role);
    }

    async destroy(id: number) {
        const role: Role = await this._m_Role.findOne({ where: { id: id } });
        return await this._m_Role.delete(role)
    }
}