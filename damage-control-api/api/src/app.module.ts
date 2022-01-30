import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MeasurementsModules } from './measurements/measurements.module';

@Module({
  imports: [MeasurementsModules, MongooseModule.forRoot(
    process.env.DB_URI
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
