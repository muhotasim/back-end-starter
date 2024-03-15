import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.model";
import { Permission } from "./permissions.model";

@Entity()
@Unique(['name'])
export class Role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    is_active: boolean

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    
    @ManyToMany(() => Permission, permission => permission.roles)
    permissions: Permission[];
}