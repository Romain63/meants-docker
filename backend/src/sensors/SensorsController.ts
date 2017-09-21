import { UseBefore, QueryParam, JsonController, Get, Post, Put, Param, Delete, Body } from 'routing-controllers';
import { Service, Inject } from 'typedi';
import _ = require('lodash');
import { ObjectID } from 'mongodb';

import { SensorModel, SensorsService } from './SensorsService';
import { IsLogged, Authorize } from '../config/authentication';
import * as countryList from 'iso-3166-country-list';
import { UnprocessableEntityError } from '../errors';
import { SensorRights } from '../core/Rights';

/**
 * Represents the sensor controller.
 * @class
 */
@Service()
@JsonController('/sensors')
export class SensorsController {

  /** Represents the sensor service @property {SensorsService} */
  @Inject()
  sensorsService: SensorsService;

  /**
   * Gets the user list filter by search text.
   * @method
   * @param {string} search The searching terms.
   * @returns The mongo filter.
   */
  private getResourceListFilter(search: string) {
    let filter = {} as any;
    if (!search || search.replace(/ /ig, '') === '') {
      return filter;
    }

    filter = {
      '$or': [
        { 'key': new RegExp(search, 'ig') },
        { 'value': new RegExp(search, 'ig') }
      ]
    };

    return filter;
  }

  /**
   * @swagger
   * /api/sensors/:
   *   get:
   *     description: Returns the list of sensors.
   *     operationId: getAll
   *     tags:
   *       - Sensors
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: sort
   *         in: query
   *         description: Sort column order.
   *         required: false
   *         type: string
   *       - name: page
   *         in: query
   *         description: Current page.
   *         required: false
   *         type: number
   *       - name: limit
   *         in: query
   *         description: Number of page element.
   *         required: false
   *         type: number
   *     responses:
   *       200:
   *         description: list of key/value translation.
   *         schema:
   *           type: array
   *           items:
   *              $ref: '#/definitions/SensorModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/')
  @UseBefore(IsLogged, Authorize(...SensorRights.ALL))
  async getAll(
    @QueryParam('sort') sort: string,
    @QueryParam('page') page: number,
    @QueryParam('limit') limit: number
    ): Promise<SensorModel[]> {
    return this.sensorsService.filter({}, { }, { sort, page, limit });
  }

  /**
   * @swagger
   * /api/sensors/count:
   *   get:
   *     description: Returns the list of sensors.
   *     operationId: count
   *     tags:
   *       - Sensors
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: number of sensors.
   *         schema:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/count')
  @UseBefore(IsLogged, Authorize(...SensorRights.ALL))
  async count(): Promise<{ count: number }> {
    const count = await this.sensorsService.count();
    return { count: count };
  }

  /**
   * @swagger
   * /api/sensors/:
   *   post:
   *     description: Create a new sensor.
   *     operationId: create
   *     tags:
   *       - Sensors
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: sensorsModel
   *         in: body
   *         description: The sensors model.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/SensorModel'
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/SensorModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Post('/')
  @UseBefore(IsLogged, Authorize(SensorRights.CREATE))
  async create( @Body({ required: true }) data: SensorModel) {
    return this.sensorsService.save(data);
  }

  /**
   * @swagger
   * /api/sensors/{id}:
   *   put:
   *     description: Create a new sensor.
   *     operationId: create
   *     tags:
   *       - Sensors
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: The sensor resource identifier.
   *         required: true
   *         type: string
   *       - name: sensorsModel
   *         in: body
   *         description: The sensors model.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/SensorModel'
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/SensorModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Put('/:id')
  @UseBefore(IsLogged, Authorize(SensorRights.UPDATE))
  async update(
    @Param('id') id: string,
    @Body({ required: true }) data: SensorModel
    ) {
    if (data.id !== id) {
      throw new UnprocessableEntityError('Bad sensor');
    }

    return this.sensorsService.save(data);
  }

  /**
   * @swagger
   * /api/sensors/{id}:
   *   delete:
   *     description: Delete new sensor.
   *     operationId: delete
   *     tags:
   *       - Sensors
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: The sensors resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: number of sensors deleted.
   *         schema:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *     security:
   *        - jwt_token: [ ]
   */
  @Delete('/:id')
  @UseBefore(IsLogged, Authorize(SensorRights.DELETE))
  async delete( @Param('id') id: string) {
    const result = await this.sensorsService.removeOne(id);
    return { count: result };
  }

  /**
   * @swagger
   * /api/sensors/{id}:
   *   get:
   *     description: Gets a sensor by its identifier.
   *     operationId: getById
   *     tags:
   *       - Sensors
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: The sensor resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/SensorModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/:id')
  @UseBefore(IsLogged, Authorize(SensorRights.READ, SensorRights.UPDATE))
  async getById( @Param('id') id: string) {
    return this.sensorsService.get(id, { fields: { resources: 0 } });
  }
}
