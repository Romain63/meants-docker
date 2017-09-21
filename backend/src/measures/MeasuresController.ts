import { UseBefore, QueryParam, JsonController, Get, Post, Put, Param, Delete, Body } from 'routing-controllers';
import { Service, Inject } from 'typedi';
import _ = require('lodash');
import { ObjectID } from 'mongodb';

import { MeasureModel, MeasuresService } from './MeasuresService';
import { IsLogged, Authorize } from '../config/authentication';
import * as countryList from 'iso-3166-country-list';
import { UnprocessableEntityError } from '../errors';
import { MeasureRights } from '../core/Rights';

/**
 * Represents the measure controller.
 * @class
 */
@Service()
@JsonController('/measures')
export class MeasuresController {

  /** Represents the measure service @property {MeasuresService} */
  @Inject()
  measuresService: MeasuresService;

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
   * /api/measures/:
   *   get:
   *     description: Returns the list of measures.
   *     operationId: getAll
   *     tags:
   *       - Measures
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
   *              $ref: '#/definitions/MeasureModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/')
  @UseBefore(IsLogged, Authorize(...MeasureRights.ALL))
  async getAll(
    @QueryParam('sort') sort: string,
    @QueryParam('page') page: number,
    @QueryParam('limit') limit: number
    ): Promise<MeasureModel[]> {
    return this.measuresService.filter({}, { }, { sort, page, limit });
  }

  /**
   * @swagger
   * /api/measures/count:
   *   get:
   *     description: Returns the list of measures.
   *     operationId: count
   *     tags:
   *       - Measures
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
   *         description: number of measures.
   *         schema:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/count')
  @UseBefore(IsLogged, Authorize(...MeasureRights.ALL))
  async count(): Promise<{ count: number }> {
    const count = await this.measuresService.count();
    return { count: count };
  }

  /**
   * @swagger
   * /api/measures/:
   *   post:
   *     description: Create a new measure.
   *     operationId: create
   *     tags:
   *       - Measures
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: measuresModel
   *         in: body
   *         description: The measures model.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/MeasureModel'
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/MeasureModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Post('/')
  @UseBefore(IsLogged, Authorize(MeasureRights.CREATE))
  async create( @Body({ required: true }) data: MeasureModel) {
    return this.measuresService.save(data);
  }

  /**
   * @swagger
   * /api/measures/{id}:
   *   put:
   *     description: Create a new measure.
   *     operationId: create
   *     tags:
   *       - Measures
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
   *         description: The measure resource identifier.
   *         required: true
   *         type: string
   *       - name: measuresModel
   *         in: body
   *         description: The measures model.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/MeasureModel'
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/MeasureModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Put('/:id')
  @UseBefore(IsLogged, Authorize(MeasureRights.UPDATE))
  async update(
    @Param('id') id: string,
    @Body({ required: true }) data: MeasureModel
    ) {
    if (data.id !== id) {
      throw new UnprocessableEntityError('Bad measure');
    }

    return this.measuresService.save(data);
  }

  /**
   * @swagger
   * /api/measures/{id}:
   *   delete:
   *     description: Delete new measure.
   *     operationId: delete
   *     tags:
   *       - Measures
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
   *         description: The measures resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: number of measures deleted.
   *         schema:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *     security:
   *        - jwt_token: [ ]
   */
  @Delete('/:id')
  @UseBefore(IsLogged, Authorize(MeasureRights.DELETE))
  async delete( @Param('id') id: string) {
    const result = await this.measuresService.removeOne(id);
    return { count: result };
  }

  /**
   * @swagger
   * /api/measures/{id}:
   *   get:
   *     description: Gets a measure by its identifier.
   *     operationId: getById
   *     tags:
   *       - Measures
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
   *         description: The measure resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/MeasureModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/:id')
  @UseBefore(IsLogged, Authorize(MeasureRights.READ, MeasureRights.UPDATE))
  async getById( @Param('id') id: string) {
    return this.measuresService.get(id, { fields: { resources: 0 } });
  }

    /**
   * @swagger
   * /api/measures/{sensorId}/measure/last:
   *   get:
   *     description: Gets the last measure for sensor by its identifier.
   *     operationId: getById
   *     tags:
   *       - Measures
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: sensorId
   *         in: path
   *         description: The sensor resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/MeasureModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/:sensorId/last')
  @UseBefore(IsLogged, Authorize(MeasureRights.READ, MeasureRights.UPDATE))
  async getLastMeasureForSensor( @Param('sensorId') sensorId: string) {
    return this.measuresService.getLastMeasureForSensor(sensorId);
  }
}
