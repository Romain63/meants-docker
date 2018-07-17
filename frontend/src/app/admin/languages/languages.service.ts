import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ListFilterParams } from '../../shared/models/list-filter-params';
import { LanguageModel } from './language-model';
import { ResourceModel } from './resource-model';
import { CultureModel } from './culture-model';
import { map } from 'rxjs/operators';
import { TotalModel } from '../../core/base-list-component';

/**
 * Represents the language list filter.
 * @class
 */
export class LanguageFilter extends ListFilterParams {
  search?: string;
}

/**
 * Represents the languages service.
 * @class
 */
@Injectable()
export class LanguagesService {
  /** POST/PUT headers */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /** Gets the base api url @property {string} */
  private baseUrl = `${environment.apiUrlBase}api/`;

  /**
   * Initializes a new instance of the LanguagesService.
   * @constructor
   * @param {AuthHttp} http The authorized http service.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets the language list url params.
   * @method
   * @param {LanguageFilter} parameters The page filter parameters.
   * @returns {HttpParams}
   */
  getUrlParams(parameters: LanguageFilter) {
    let params = new HttpParams();
    if ((parameters.search || '') !== '') {
      params = params.append('search', parameters.search);
    }
    if ((parameters.sort || '') !== '') {
      params = params.append('sort', parameters.sort);
    }
    params = params.append('page', parameters.page.toString());
    params = params.append('limit', parameters.limit.toString());
    return params;
  }

  /**
   * Gets all cultures.
   * @method
   * @return {Observable<CultureModel[]>}
   */
  cultures() {
    return this.http.get(`${this.baseUrl}languages/cultures`).pipe(
      map(response => response as CultureModel[]));
  }

  /**
   * Gets all languages with pagination.
   * @method
   * @param {LanguageFilter} parameters The page filter parameters.
   * @return {Observable<LanguageModel[]>}
   */
  all(parameters: LanguageFilter) {
    console.log(parameters)
    const params = this.getUrlParams(parameters);
    const headers = new HttpHeaders();
    console.log(params)
    return this.http.get(`${this.baseUrl}languages`, { headers: headers, params: params }).pipe(
      map(response => response as LanguageModel[])
    );
  }

  /**
   * Gets the number of languages.
   * @method
   * @return {Observable<{ count: number }>}
   */
  allCount() {
    return this.http.get(`${this.baseUrl}languages/count`).pipe(
      map(response => response as TotalModel)
    );
  }

  /**
   * Gets the language model by its identifier.
   * @method
   * @param {string} languageId The requested language identifier.
   * @returns {Observable<LanguageModel>}
   */
  getById(languageId: string) {
    return this.http.get(`${this.baseUrl}languages/${languageId}`).pipe(
      map(response => response as LanguageModel)
    );
  }

  /**
   * Create a new language.
   * @method
   * @param {LanguageModel} data The language model to create.
   * @return {Observable<LanguageModel>}
   */
  create(data: LanguageModel) {
    delete data.id;
    return this.http.post(`${this.baseUrl}languages`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as LanguageModel)
    );
  }

  /**
   * Update an existing language.
   * @method
   * @param {LanguageModel} data The language model to update.
   * @return {Observable<LanguageModel>}
   */
  update(data: LanguageModel) {
    const id = data.id;
    return this.http.put(`${this.baseUrl}languages/${id}`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as LanguageModel)
    );
  }

  /**
   * Remove a language.
   * @method
   * @param {string} id The language identifier to remove.
   */
  remove(id: string) {
    return this.http.delete(`${this.baseUrl}languages/${id}`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }

  /**
   * Gets all languages resources with pagination.
   * @method
   * @param {string} langId The current language identifier.
   * @param {LanguageFilter} parameters The page filter parameters.
   * @return {Observable<ResourceModel[]>}
   */
  allResources(langId: string, parameters: LanguageFilter) {
    const params = this.getUrlParams(parameters);
    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}languages/${langId}/resources`, { headers, params }).pipe(
      map(response => response as ResourceModel[])
    );
  }

  /**
   * Gets the number of languages resources.
   * @method
   * @param {string} langId The current language identifier.
   * @param {string} search The searching terms.
   * @return {Observable<{ count: number }>}
   */
  allResourcesCount(langId: string, search: string) {
    const params = new HttpParams();
    if ((search || '') !== '') {
      params.set('search', search);
    }
    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}languages/${langId}/resources/count`, { headers, params }).pipe(
      map(response => response as { count: number })
    );
  }

  /**
   * Create a new languages resource.
   * @method
   * @param {string} langId The current language identifier.
   * @param {ResourceModel} data The languages resource model to create.
   * @return {Observable<ResourceModel>}
   */
  createResource(langId: string, data: ResourceModel) {
    delete data.id;
    return this.http.post(`${this.baseUrl}languages/${langId}/resources`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as ResourceModel)
    );
  }

  /**
   * Update an existing languages resource.
   * @method
   * @param {string} langId The current language identifier.
   * @param {ResourceModel} data The languages resource model to update.
   * @return {Observable<ResourceModel>}
   */
  updateResource(langId: string, data: ResourceModel) {
    const id = data.id;
    return this.http.put(`${this.baseUrl}languages/${langId}/resources/${id}`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as ResourceModel)
    );
  }

  /**
   * Remove a language resource.
   * @method
   * @param {string} langId The current language identifier.
   * @param {string} id The language identifier to remove.
   */
  removeResource(langId: string, id: string) {
    return this.http.delete(`${this.baseUrl}languages/${langId}/resources/${id}`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }
}
