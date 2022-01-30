import { Model } from 'mongoose';
import { Measurement } from "./measurement.model";
export declare class MeasurementsService {
    private readonly measurementModel;
    private Measurements;
    constructor(measurementModel: Model<Measurement>);
    insertMeasurement(temp: number, humidity: number, waterLevel: number, timestamp: Date): Promise<string>;
    getMeasurements(): Promise<{
        id: string;
        temp: number;
        humidity: number;
        waterLevel: number;
        timestamp: Date;
    }[]>;
    getSingleMeasurement(measurementId: string): Promise<{
        id: string;
        temp: number;
        humidity: number;
        waterLevel: number;
        timestamp: Date;
    }>;
    updateMeasurement(measurementId: string, temp: number, humidity: number, waterLevel: number, timestamp: Date): Promise<void>;
    deleteMeasurement(measId: any): Promise<void>;
    private findMeasurement;
}
