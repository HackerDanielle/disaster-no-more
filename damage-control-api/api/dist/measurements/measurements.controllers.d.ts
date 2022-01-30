import { MeasurementsService } from './measurements.service';
export declare class MeasurementsController {
    private readonly measurementsService;
    constructor(measurementsService: MeasurementsService);
    addMeasurement(measTemp: number, measHumidity: number, measwaterLevel: number, measTimestamp: Date): Promise<{
        id: string;
    }>;
    getAllMeasurements(): Promise<{
        id: string;
        temp: number;
        humidity: number;
        waterLevel: number;
        timestamp: Date;
    }[]>;
    getMeasurement(measId: string): Promise<{
        id: string;
        temp: number;
        humidity: number;
        waterLevel: number;
        timestamp: Date;
    }>;
    updateMeasurement(measId: string, measTemp: number, measHumidity: number, measwaterLevel: number, measTimestamp: Date): Promise<any>;
    removeMeasurement(measId: string): Promise<any>;
}
