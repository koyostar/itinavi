import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotel: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  checkIn: Date;

  @Column({ type: 'date' })
  checkOut: Date;

  @Column({ nullable: true })
  notes?: string;
}
