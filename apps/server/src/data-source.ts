import { DataSource } from 'typeorm';
import { Accommodation } from './accommodation/accommodation.entity';
import { config } from 'dotenv';

config(); // This line loads environment variables

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/*.entity{.ts,.js}'], // Add other entities as needed
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});
