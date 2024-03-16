import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";
import { hashPassword } from "src/utils/common.functions";
import { FindManyOptions, Like, Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly _m_User: Repository<User>) { }

    async findAndCount(page: number = 1, perPage: number = 10, filterParams: { search?: string, is_active?: boolean }): Promise<{data: User[], total:number}> {
        const options: FindManyOptions<User> = {
            take: perPage,
            skip: perPage * (page - 1),
        };
        if (filterParams && filterParams.search && filterParams.is_active != null) {
            options.where = [

            ];
            options.where.push({ email: Like(`%${filterParams.search}%`) })
            options.where.push({ name: Like(`%${filterParams.search}%`) })

            if (filterParams.is_active != null) {
                options.where.push({ is_active: filterParams.is_active });
            }
        }
        const [data, total] = await this._m_User.findAndCount(options);
        return {data, total};
    }

    async findAll():Promise<User[]>{
        return await this._m_User.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this._m_User.findOne({ where: { id: id } });
    }

    async user(id: number) {

        const userInfo = await this._m_User
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('roles.permissions', 'permissions')
        .leftJoinAndSelect('user.tokens', 'tokens', 'tokens.ac_token_expires_at > :currentDate OR tokens.rf_token_expires_at > :currentDate', { currentDate: new Date().getTime() })
        .getOne();
        let permissions = [];

        for(let role of userInfo.roles){
            role.permissions.forEach((permission)=>{
                permissions.push(permission)
            })
        }
        let userObj = {...userInfo, permissions: permissions};
        delete userObj.roles

        return userObj;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this._m_User.findOne({ where: { email: email } });
    }

    async findRolesByUserId (id: number){
        return await this._m_User.findOne({ where: { id: id }, relations: ['roles'] });
    }

    async findPermissionByUserId (id: number){
        return await this._m_User.findOne({ where: { id: id }, relations: ['roles', 'roles.permissions'] });
    }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this._m_User.create(user);
        return await this._m_User.save(newUser);
    }

    async update(id: number, updateUserDto: Partial<User>): Promise<User | false> {
        const user = await this._m_User.findOne({ where: { id: id } });
        if (!user) {
            return false;
        }

        Object.assign(user, updateUserDto);
        return await this._m_User.save(user);
    }

    async destroy(id: number) {
        const user: User = await this._m_User.findOne({ where: { id: id } });
        return await this._m_User.delete(user)
    }
}