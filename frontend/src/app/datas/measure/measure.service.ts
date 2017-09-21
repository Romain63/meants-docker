import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { ListFilterParams } from '../../shared/models/list-filter-params';
import { MeasureModel } from './measure-model';

/**
 * Represents the measure list filter.
 * @class
 */
export class MeasureFilter extends ListFilterParams {
    search?: string;
}

/**
 * Represents the measures service.
 * @class
 */
@Injectable()
export class MeasureService {

    /** POST/PUT headers */
    private headers = new Headers({ 'Content-Type': 'application/json' });

    /** Gets the base api url @property {string} */
    private baseUrl = `${environment.apiUrlBase}api/`;

    /**
     * Initializes a new instance of the MeasuresService.
     * @constructor
     * @param {AuthHttp} http The authorized http service.
     */
    constructor(private http: AuthHttp) { }

    /**
     * Gets the measure list url params.
     * @method
     * @param {MeasureFilter} parameters The page filter parameters.
     * @returns {URLSearchParams}
     */
    getUrlParams(parameters: MeasureFilter) {
        const params = new URLSearchParams();
        if ((parameters.search || '') !== '') {
            params.set('search', parameters.search);
        }
        if ((parameters.sort || '') !== '') {
            params.set('sort', parameters.sort);
        }
        params.set('page', parameters.page.toString());
        params.set('limit', parameters.limit.toString());
        return params;
    }

    /**
     * Gets all measures with pagination.
     * @method
     * @param {MeasureFilter} parameters The page filter parameters.
     * @return {Observable<CompanyModel[]>}
     */
    all(parameters: MeasureFilter) {
        const params = this.getUrlParams(parameters);
        return this.http.get(`${this.baseUrl}measures`, { search: params }).map(response => response.json() as MeasureModel[]);
    }

    /**
     * Gets the number of measures.
     * @method
     * @return {Observable<{ count: number }>}
     */
    allCount(search?: string) {
        const params = new URLSearchParams();
        if ((search || '') !== '') {
            params.set('search', search);
        }
        return this.http.get(`${this.baseUrl}measures/count`, { search: params }).map(response => response.json());
    }

    /**
     * Gets the measure model by its identifier.
     * @method
     * @param {string} measureId The requested measure identifier.
     * @returns {Observable<MeasureModel>}
     */
    getById(measureId: string) {
        return this.http.get(`${this.baseUrl}measures/${measureId}`).map(response => response.json() as MeasureModel);
    }

    /**
     * Gets the last measure by the specified sensor identifier.
     * @method
     * @param {string} measureId The requested measure identifier.
     * @returns {Observable<MeasureModel>}
     */
    getLastMeasureBySensorId(sensorId: string) {
        return this.http.get(`${this.baseUrl}measures/${sensorId}/last`).map(response => response.json() as MeasureModel);
    }

    /**
     * Create a new measure.
     * @method
     * @param {MeasureModel} data The measure model to create.
     * @return {Observable<MeasureModel>}
     */
    create(data: MeasureModel) {
        delete data.id;
        return this.http.post(`${this.baseUrl}measures`, JSON.stringify(data), { headers: this.headers })
            .map(response => response.json() as MeasureModel);
    }

    /**
     * Update an existing measure.
     * @method
     * @param {MeasureModel} data The measure model to update.
     * @return {Observable<MeasureModel>}
     */
    update(data: MeasureModel) {
        const id = data.id;
        return this.http.put(`${this.baseUrl}measures/${id}`, JSON.stringify(data), { headers: this.headers })
            .map(response => response.json() as MeasureModel);
    }

    /**
     * Remove a measure.
     * @method
     * @param {string} id The measure identifier to remove.
     */
    remove(id: string) {
        return this.http.delete(`${this.baseUrl}measure/${id}`, { headers: this.headers })
            .map(response => response.json());
    }
}
