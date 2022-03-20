import { Entity, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class BookBaseEntity extends BaseEntity  {
 
    @PrimaryGeneratedColumn('identity')
    id: any

    @CreateDateColumn()
    created_at: Date = new Date

    @UpdateDateColumn()
    updated_at: Date = new Date

}