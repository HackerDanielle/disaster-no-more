"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MeasurementsService = class MeasurementsService {
    constructor(measurementModel) {
        this.measurementModel = measurementModel;
        this.Measurements = [];
    }
    async insertMeasurement(temp, humidity, waterLevel, timestamp) {
        const measId = Math.random().toString();
        const newMeasurement = new this.measurementModel({
            temp,
            humidity,
            waterLevel,
            timestamp
        });
        const result = await newMeasurement.save();
        console.log(result);
        return result.id;
    }
    async getMeasurements() {
        const measurements = await this.measurementModel.find().exec();
        return measurements.map((meas) => ({ id: meas.id, temp: meas.temp, humidity: meas.humidity, waterLevel: meas.waterLevel, timestamp: meas.timestamp }));
    }
    async getSingleMeasurement(measurementId) {
        const measurement = await this.findMeasurement(measurementId);
        return {
            id: measurement.id,
            temp: measurement.temp,
            humidity: measurement.humidity,
            waterLevel: measurement.waterLevel,
            timestamp: measurement.timestamp
        };
    }
    async updateMeasurement(measurementId, temp, humidity, waterLevel, timestamp) {
        const updatedMeasurement = await this.findMeasurement(measurementId);
        if (temp) {
            updatedMeasurement.temp = temp;
        }
        if (humidity) {
            updatedMeasurement.humidity = humidity;
        }
        if (waterLevel) {
            updatedMeasurement.waterLevel = waterLevel;
        }
        if (timestamp) {
            updatedMeasurement.timestamp = timestamp;
        }
        updatedMeasurement.save();
    }
    async deleteMeasurement(measId) {
        const result = await this.measurementModel.deleteOne({ _id: measId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find product.');
        }
        console.log(result);
    }
    async findMeasurement(id) {
        let measurement;
        try {
            measurement = await this.measurementModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find product');
        }
        if (!measurement) {
            throw new common_1.NotFoundException('Could not find product');
        }
        return measurement;
    }
};
MeasurementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Measurement')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MeasurementsService);
exports.MeasurementsService = MeasurementsService;
//# sourceMappingURL=measurements.service.js.map