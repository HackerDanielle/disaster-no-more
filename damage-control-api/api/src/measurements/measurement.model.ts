import * as mongoose from 'mongoose';

export const MeasurementSchema = new mongoose.Schema({
  temp: { type: String, required: true},
  humidity: { type: String, required: true},
  waterLevel: {type: Number, required: true},
  timestamp: {type: Date, required: true}
});

export interface Measurement extends mongoose.Document {
  id: string;
  temp: number;
  humidity: number;
  waterLevel: number;
  timestamp: Date;
}