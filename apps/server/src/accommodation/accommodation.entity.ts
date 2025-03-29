import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotel: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp', nullable: true })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOut: Date;

  @Column({ nullable: true })
  notes?: string;
}
