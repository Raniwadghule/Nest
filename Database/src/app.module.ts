import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from './photo/photo.service';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [TypeOrmModule.forRoot(),
  PhotoModule
],
  controllers: [AppController, PhotoController, CatsController],
  providers: [AppService,PhotoService],
})
export class AppModule {
  constructor(private readonly connection: Connection){}
}
