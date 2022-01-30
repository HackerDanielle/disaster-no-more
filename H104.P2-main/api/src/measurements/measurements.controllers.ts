import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { MeasurementsService } from './measurements.service';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService){}
  
  @Post()
  async addMeasurement(
    @Body('temp') measTemp: number, 
    @Body('humidity') measHumidity: number, 
    @Body('waterLevel') measwaterLevel: number,
    @Body('timestamp') measTimestamp: Date
  ){
    const generatedId = await this.measurementsService.insertMeasurement(measTemp,measHumidity,measwaterLevel,measTimestamp);
    return {id: generatedId}
  }

  @Get()
  async getAllMeasurements(){
    const measurements = await this.measurementsService.getMeasurements();
    return measurements;
  }

  @Get(':id')
  getMeasurement(@Param('id') measId: string){
    return this.measurementsService.getSingleMeasurement(measId);
  }
  
  @Patch(':id')
    async updateMeasurement(
      @Param('id') measId: string, 
      @Body('temp') measTemp: number, 
      @Body('humidity') measHumidity: number, 
      @Body('waterLevel') measwaterLevel: number,
      @Body('timestamp') measTimestamp: Date
    ){
      await this.measurementsService.updateMeasurement(measId,measTemp,measHumidity,measwaterLevel,measTimestamp);
      return null;
    }

  @Delete(':id')
    async removeMeasurement(
      @Param('id') measId: string,
    ){
      await this.measurementsService.deleteMeasurement(measId);
      return null;
    }

}