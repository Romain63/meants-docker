import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';

import { environment } from '../../../environments/environment';
import { ListFilterParams } from '../../shared/models/list-filter-params';
import { UserModel } from './user-model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TotalModel } from '../../core/base-list-component';

/**
 * Represents the user list filter.
 * @class
 */
export class UserFilter extends ListFilterParams {
  search?: string;
}

/**
 * Represents the users service.
 * @class
 */
@Injectable()
export class UsersService {
  /** POST/PUT headers */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /** Gets the base api url @property {string} */
  private baseUrl = `${environment.apiUrlBase}api/`;

  /**
   * Initializes a new instance of the UsersService.
   * @constructor
   * @param {AuthHttp} http The authorized http service.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets the user list url params.
   * @method
   * @param {UserFilter} parameters The page filter parameters.
   * @returns {URLSearchParams}
   */
  getUrlParams(parameters: UserFilter) {
    let params = new HttpParams();
    if ((parameters.sort || '') !== '') {
      params = params.set('sort', parameters.sort);
    }
    if ((parameters.search || '') !== '') {
      params = params.set('search', parameters.search);
    }
    params = params.set('page', parameters.page.toString());
    params = params.set('limit', parameters.limit.toString());
    return params;
  }

  /**
   * Gets all users with pagination.
   * @method
   * @param {UserFilter} parameters The page filter parameters.
   * @return {Observable<UserModel[]>}
   */
  all(parameters: UserFilter) {
    const params = this.getUrlParams(parameters);
    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}users`, { headers, params }).pipe(
      map(response => response as UserModel[])
    );
  }

  /**
   * Gets all users with pagination.
   * @method
   * @param {string} search The searching terms.
   * @return {Observable<{ count: number }>}
   */
  allCount(search: string) {
    const params = new HttpParams();
    if ((search || '') !== '') {
      params.set('search', search);
    }
    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}users/count`, { headers: headers, params: params }).pipe(
      map(response => response as TotalModel)
    );
  }

  /**
   * Gets the user model by its identifier.
   * @method
   * @param {string} userId The requested user identifier.
   * @returns {Observable<UserModel>}
   */
  getById(userId: string) {
    return this.http.get(`${this.baseUrl}users/${userId}`).pipe(
      map(response => response as UserModel)
    );
  }

  /**
   * Create a new user.
   * @method
   * @param {UserModel} data The user model to create.
   * @return {Observable<UserModel>}
   */
  create(data: UserModel) {
    return this.http.post(`${this.baseUrl}users`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as UserModel)
    )
  }

  /**
   * Update an existing user.
   * @method
   * @param {UserModel} data The user model to update.
   * @return {Observable<UserModel>}
   */
  update(data: UserModel) {
    const id = data.id;
    return this.http.put(`${this.baseUrl}users/${id}`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as UserModel)
    );
  }

  /**
   * Remove a user.
   * @method
   * @param {string} id The user identifier to remove.
   */
  remove(id: string) {
    return this.http.delete(`${this.baseUrl}users/${id}`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }

  /**
   * Gets all rights.
   * @method
   * @returns {Observable<any>}
   */
  allRights() {
    return this.http.get(`${this.baseUrl}users/rights`, { headers: this.headers }).pipe(
      map(response => response)
    );
  }

  /**
   * Gets user rights.
   * @method
   * @returns {Observable<string[]>}
   */
  userRights(id: string) {
    return this.http.get(`${this.baseUrl}users/${id}/rights`, { headers: this.headers }).pipe(
      map(response => response as string[])
    );
  }

  /**
   * Get the current user
   * @method
   * @returns {Observable<UserModel>}
   */
  getCurrentUser() {
    return this.http.get(`${this.baseUrl}users/me`).pipe(
      map(response => response as UserModel)
    );
  }

  /**
   * Gets user rights.
   * @method
   * @param {string} id The current user identifier.
   * @param {string[]} data The current user rights.
   * @returns {Observable<string[]>}
   */
  updateRights(id: string, data: string[]) {
    return this.http.put(`${this.baseUrl}users/${id}/rights`, JSON.stringify(data), { headers: this.headers }).pipe(
      map(response => response as string[])
    )
  }
}
