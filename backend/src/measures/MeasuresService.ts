import { Service, Inject } from 'typedi';
import { ObjectID, Cursor } from 'mongodb';

import { MeasureModel } from './aggregates/MeasureModel';
import { MongoService, PaginationFilter } from '../core/MongoService';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import { MongoCollection } from '../core/decorators';
import { SensorsService } from '../sensors/SensorsService';

/**
 * Represents the sensors service.
 * @class
 * @extends {MongoService<LanguageModel>}
 */
@Service()
@MongoCollection('Measure')
export class MeasuresService extends MongoService<MeasureModel> {

    /**
     * Sensor Service
     */
    @Inject()
    sensorsService: SensorsService;

    async getLastMeasureForSensor(sensorId : string) {
        const sensor = await this.sensorsService.findOne(ObjectID.createFromHexString(sensorId));
        if (!sensor) {
            throw new NotFoundError(`point not found: ${sensorId}`);
        }
        const query = Object.assign({ sensor: { $eq: "" + sensor.identifier }});
        const sort = Object.assign({ time: -1 });
        var result = await this.findAndSort(query, sort , 1)
        if (!result) {
            return {}
        } else {
            return result[0];
        }
    }
}

export { MeasureModel };
