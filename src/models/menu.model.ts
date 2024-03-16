import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity()
export class Menu{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string

    @Column()
    link: string

    @Column()
    is_active: boolean

    @ManyToOne(type => Menu, menu => menu.childrens, { nullable: true })
    @JoinColumn({ name: "parent_menu_id" })
    parent: Menu;
  
    @Column({ nullable: true })
    parent_menu_id: number;

    @OneToMany(type => Menu, menu => menu.parent)
    childrens: Menu[];
}