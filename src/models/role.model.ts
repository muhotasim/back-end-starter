import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
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
 
    @ManyToMany((type) => User, user => user.roles)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
          name: 'role_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
      })
    users: User[];

    
    @ManyToMany((type) => Permission, permission => permission.roles)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[];
}