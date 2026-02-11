import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('resaturents')
export class Restaurent {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    restaurantname: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column({ type: 'uuid' })
    userId: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

}