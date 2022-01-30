import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controllers';
import { MeasurementSchema } from './measurement.model';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Measurement', schema: MeasurementSchema}])
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService]
})
export class MeasurementsModules {}