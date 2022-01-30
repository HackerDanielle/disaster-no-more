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
exports.MeasurementsController = void 0;
const common_1 = require("@nestjs/common");
const measurements_service_1 = require("./measurements.service");
let MeasurementsController = class MeasurementsController {
    constructor(measurementsService) {
        this.measurementsService = measurementsService;
    }
    async addMeasurement(measTemp, measHumidity, measwaterLevel, measTimestamp) {
        const generatedId = await this.measurementsService.insertMeasurement(measTemp, measHumidity, measwaterLevel, measTimestamp);
        return { id: generatedId };
    }
    async getAllMeasurements() {
        const measurements = await this.measurementsService.getMeasurements();
        return measurements;
    }
    getMeasurement(measId) {
        return this.measurementsService.getSingleMeasurement(measId);
    }
    async updateMeasurement(measId, measTemp, measHumidity, measwaterLevel, measTimestamp) {
        await this.measurementsService.updateMeasurement(measId, measTemp, measHumidity, measwaterLevel, measTimestamp);
        return null;
    }
    async removeMeasurement(measId) {
        await this.measurementsService.deleteMeasurement(measId);
        return null;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('temp')),
    __param(1, (0, common_1.Body)('humidity')),
    __param(2, (0, common_1.Body)('waterLevel')),
    __param(3, (0, common_1.Body)('timestamp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Date]),
    __metadata("design:returntype", Promise)
], MeasurementsController.prototype, "addMeasurement", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeasurementsController.prototype, "getAllMeasurements", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeasurementsController.prototype, "getMeasurement", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('temp')),
    __param(2, (0, common_1.Body)('humidity')),
    __param(3, (0, common_1.Body)('waterLevel')),
    __param(4, (0, common_1.Body)('timestamp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Date]),
    __metadata("design:returntype", Promise)
], MeasurementsController.prototype, "updateMeasurement", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeasurementsController.prototype, "removeMeasurement", null);
MeasurementsController = __decorate([
    (0, common_1.Controller)('measurements'),
    __metadata("design:paramtypes", [measurements_service_1.MeasurementsService])
], MeasurementsController);
exports.MeasurementsController = MeasurementsController;
//# sourceMappingURL=measurements.controllers.js.map