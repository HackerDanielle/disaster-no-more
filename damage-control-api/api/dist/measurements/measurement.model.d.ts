import * as mongoose from 'mongoose';
export declare const MeasurementSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
export interface Measurement extends mongoose.Document {
    id: string;
    temp: number;
    humidity: number;
    waterLevel: number;
    timestamp: Date;
}
