import { PendingItem } from "src/pending-item/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text')
    username: string;
    @Column('text')
    password: string;
    @OneToMany(type => PendingItem, pendingItem => pendingItem.user)
    pendingItems: PendingItem[];
}