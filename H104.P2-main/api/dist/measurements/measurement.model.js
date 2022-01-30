"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementSchema = void 0;
const mongoose = require("mongoose");
exports.MeasurementSchema = new mongoose.Schema({
    temp: { type: String, required: true },
    humidity: { type: String, required: true },
    waterLevel: { type: Number, required: true },
    timestamp: { type: Date, required: true }
});
//# sourceMappingURL=measurement.model.js.map