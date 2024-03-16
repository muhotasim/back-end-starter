import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
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
    @JoinTable({
        name: 'role_permission',
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        joinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    roles: Role[];
}