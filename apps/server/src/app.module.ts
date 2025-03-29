import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test } from './test.entity';
import { AccommodationModule } from './accommodation/accommodation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Use only for dev!
      logging: true,
      entities: [Test],
    }),
    AccommodationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
