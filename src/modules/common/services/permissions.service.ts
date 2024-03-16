import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/models/permissions.model";
import { FindManyOptions, Like, Repository } from "typeorm";

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly _m_Permission: Repository<Permission>) { }
    async findAndCount(page: number = 1, perPage: number = 10, filterParams: { search?: string, is_active?: boolean }): Promise<{ data: Permission[], total: number }> {
        const options: FindManyOptions<Permission> = {
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
        const [data, total] = await this._m_Permission
            .findAndCount(options);
        return { data, total };
    }

    async findAll(): Promise<Permission[]> {
        return await this._m_Permission.find();
    }

    async findById(id: number): Promise<Permission | null> {
        return await this._m_Permission.findOne({ where: { id: id } });
    }

    async create(permission: Partial<Permission>): Promise<Permission> {
        const newPermission = this._m_Permission.create(permission);
        return await this._m_Permission.save(newPermission);
    }

    async update(id: number, updatePermissionDto: Partial<Permission>): Promise<Permission | false> {
        const permission = await this._m_Permission.findOne({ where: { id: id } });
        if (!permission) {
            return false;
        }

        Object.assign(permission, updatePermissionDto);
        return await this._m_Permission.save(permission);
    }


    async destroy(id: number) {
        const permission: Permission = await this._m_Permission.findOne({ where: { id: id } });
        return await this._m_Permission.delete(permission)
    }
}