"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementsModules = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const measurements_service_1 = require("./measurements.service");
const measurements_controllers_1 = require("./measurements.controllers");
const measurement_model_1 = require("./measurement.model");
let MeasurementsModules = class MeasurementsModules {
};
MeasurementsModules = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Measurement', schema: measurement_model_1.MeasurementSchema }])
        ],
        controllers: [measurements_controllers_1.MeasurementsController],
        providers: [measurements_service_1.MeasurementsService]
    })
], MeasurementsModules);
exports.MeasurementsModules = MeasurementsModules;
//# sourceMappingURL=measurements.module.js.map