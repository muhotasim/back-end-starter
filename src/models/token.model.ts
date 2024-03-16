import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.model";
import { User } from "./user.model";

@Entity()
export class Token{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type:'text'})
    access_token: string;

    @Column({type:'text'})
    refresh_token: string;

    @ManyToOne(type => User, user => user.tokens)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({type:'bigint'})
    ac_token_expires_at: number;

    @Column({type:'bigint'})
    rf_token_expires_at: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    issued_at: Date;


    
}