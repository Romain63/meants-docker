import { Service, Inject } from 'typedi';
import { ObjectID, Cursor } from 'mongodb';

import { SensorModel } from './aggregates/SensorModel';
import { MongoService, PaginationFilter } from '../core/MongoService';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import { MongoCollection } from '../core/decorators';

/**
 * Represents the sensors service.
 * @class
 * @extends {MongoService<LanguageModel>}
 */
@Service()
@MongoCollection('Sensors')
export class SensorsService extends MongoService<SensorModel> {

}

export { SensorModel };
