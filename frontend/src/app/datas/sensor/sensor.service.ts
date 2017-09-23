import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { ListFilterParams } from '../../shared/models/list-filter-params';
import { SensorModel } from './sensor-model';

/**
 * Represents the sensor list filter.
 * @class
 */
export class SensorFilter extends ListFilterParams {
    search?: string;
}

/**
 * Represents the sensors service.
 * @class
 */
@Injectable()
export class SensorService {

    /** POST/PUT headers */
    private headers = new Headers({ 'Content-Type': 'application/json' });

    /** Gets the base api url @property {string} */
    private baseUrl = `${environment.apiUrlBase}api/`;

    /**
     * Initializes a new instance of the SensorsService.
     * @constructor
     * @param {AuthHttp} http The authorized http service.
     */
    constructor(private http: AuthHttp) { }

    /**
     * Gets the sensor list url params.
     * @method
     * @param {SensorFilter} parameters The page filter parameters.
     * @returns {URLSearchParams}
     */
    getUrlParams(parameters: SensorFilter) {
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
     * Gets all sensors with pagination.
     * @method
     * @param {SensorFilter} parameters The page filter parameters.
     * @return {Observable<CompanyModel[]>}
     */
    all(parameters: SensorFilter) {
        const params = this.getUrlParams(parameters);
        return this.http.get(`${this.baseUrl}sensors`, { search: params }).map(response => response.json() as SensorModel[]);
    }

    /**
     * Gets the number of sensors.
     * @method
     * @return {Observable<{ count: number }>}
     */
    allCount(search?: string) {
        const params = new URLSearchParams();
        if ((search || '') !== '') {
            params.set('search', search);
        }
        return this.http.get(`${this.baseUrl}sensors/count`, { search: params }).map(response => response.json());
    }

    /**
     * Gets the sensor model by its identifier.
     * @method
     * @param {string} sensorId The requested sensor identifier.
     * @returns {Observable<SensorModel>}
     */
    getById(sensorId: string) {
        return this.http.get(`${this.baseUrl}sensors/${sensorId}`).map(response => response.json() as SensorModel);
    }

    /**
     * Create a new sensor.
     * @method
     * @param {SensorModel} data The sensor model to create.
     * @return {Observable<SensorModel>}
     */
    create(data: SensorModel) {
        delete data.id;
        return this.http.post(`${this.baseUrl}sensors`, JSON.stringify(data), { headers: this.headers })
            .map(response => response.json() as SensorModel);
    }

    /**
     * Update an existing sensor.
     * @method
     * @param {SensorModel} data The sensor model to update.
     * @return {Observable<SensorModel>}
     */
    update(data: SensorModel) {
        const id = data.id;
        return this.http.put(`${this.baseUrl}sensors/${id}`, JSON.stringify(data), { headers: this.headers })
            .map(response => response.json() as SensorModel);
    }

    /**
     * Remove a sensor.
     * @method
     * @param {string} id The sensor identifier to remove.
     */
    remove(id: string) {
        return this.http.delete(`${this.baseUrl}sensors/${id}`, { headers: this.headers })
            .map(response => response.json());
    }
}
