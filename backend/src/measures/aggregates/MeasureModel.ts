import { ObjectID } from 'mongodb';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

import { MongoModelBase } from '../../core/MongoModelBase';

/**
 * @swagger
 * definitions:
 *   MeasureModel:
 *     type: object
 *     required:
 *       - name
 *       - room
 *     properties:
 *       name:
 *         type: string
 *       room:
 *         type: string
 *       identifier:
 *         type: number
 *       description:
 *         type: string
 */
export class MeasureModel extends MongoModelBase {

  @IsNotEmpty()
  temperature: number;

  @IsNotEmpty()
  sensor: number;

  @IsNotEmpty()
  time: Date;

}