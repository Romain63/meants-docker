import { ObjectID } from 'mongodb';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

import { MongoModelBase } from '../../core/MongoModelBase';

/**
 * @swagger
 * definitions:
 *   SensorModel:
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
export class SensorModel extends MongoModelBase {
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @MinLength(5)
  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  identifier: number;

  description: string;

}