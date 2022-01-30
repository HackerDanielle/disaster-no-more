import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

import { Measurement } from "./measurement.model";

@Injectable()
export class MeasurementsService{
  private Measurements: Measurement[] = [];

  constructor(@InjectModel('Measurement') private readonly measurementModel: Model<Measurement>){}

  async insertMeasurement(temp: number, humidity: number, waterLevel: number, timestamp: Date){
    const measId = Math.random().toString();
    const newMeasurement = new this.measurementModel({
      temp, 
      humidity, 
      waterLevel,
      timestamp
    });
    const result = await newMeasurement.save();
    console.log(result);
    return result.id as string;
  }

  async getMeasurements(){
    const measurements = await this.measurementModel.find().exec();
    return measurements.map((meas) => ({id: meas.id, temp: meas.temp, humidity: meas.humidity, waterLevel: meas.waterLevel, timestamp: meas.timestamp }));
  }

  async getSingleMeasurement(measurementId: string){
    const measurement = await this.findMeasurement(measurementId);
    return {
      id: measurement.id, 
      temp: measurement.temp, 
      humidity: measurement.humidity, 
      waterLevel: measurement.waterLevel, 
      timestamp: measurement.timestamp
    };
  }

  async updateMeasurement(measurementId: string, temp:number, humidity: number, waterLevel: number, timestamp: Date){
    const updatedMeasurement = await this.findMeasurement(measurementId);
    
    if(temp){
      updatedMeasurement.temp = temp
    }
    if(humidity){
      updatedMeasurement.humidity = humidity
    }
    if(waterLevel){
      updatedMeasurement.waterLevel = waterLevel;
    }
    if(timestamp){
      updatedMeasurement.timestamp = timestamp;
    }
    updatedMeasurement.save();
  }

  async deleteMeasurement(measId){
    const result = await this.measurementModel.deleteOne({_id: measId}).exec();
    if(result.deletedCount === 0){
      throw new NotFoundException('Could not find product.');
    }
    console.log(result);
  }

  private async findMeasurement(id: string): Promise<Measurement>{
    let measurement;
    try{
      measurement = await this.measurementModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product')
    }
    if(!measurement){
      throw new NotFoundException('Could not find product');
    }
    return measurement;
  }
  
}