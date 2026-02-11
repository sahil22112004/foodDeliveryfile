import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('dishes')
export class Dish {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    dishname: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column({ type: 'uuid' })
    userId: string;

    @Column({ type: 'uuid' })
    restaurantId: string;

    @Column({ default:true })
    isAvailable: boolean;

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
