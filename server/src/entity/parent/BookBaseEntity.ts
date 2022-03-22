import { Entity, BaseEntity, CreateDateColumn, UpdateDateColumn, ObjectID, ObjectIdColumn, Column, AfterUpdate } from "typeorm";

@Entity()
export default class BookBaseEntity extends BaseEntity  {
 
    @ObjectIdColumn()
    id!: ObjectID

    @CreateDateColumn()
    created_at: Date = new Date

    @UpdateDateColumn()
    updated_at: Date = new Date

    @Column()
    version: number = 1


    @AfterUpdate()
    increaseVersion() {
        if (this.version === undefined)
            this.version = 1
        else
            this.version += 1
    }

}