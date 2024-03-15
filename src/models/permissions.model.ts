import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.model";

@Entity()
@Unique(['name'])
export class Permission{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    is_active: boolean    
    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}