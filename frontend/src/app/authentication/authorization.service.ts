import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, of, timer } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { StorageService } from '../core/storage.service';
import { environment } from '../../environments/environment';
import { AuthModel, UserModel, LoginModel } from './models';
import { userRightsKey } from '../core/base-rights-guard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const authKey = 'app.ath';
const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };

/**
 * Represents the authorization service.
 * @class
 */
@Injectable()
export class AuthorizationService {

  /** The rights changed event emitter @property {EventEmitter<void>} */
  private rightsChanged: EventEmitter<void> = new EventEmitter<void>();

  /** The redirect url. @property {string} */
  redirectUrl: string;

  /** Gets the base api url @property {string} */
  private baseUrl = environment.apiUrlBase;

  private refreshSubscription: any;

  /**
   * Initializes a new instance of the AuthorizationService class.
   * @param {StorageService} storage The application storage service.
   * @param {Http} http The angular http service.
   * @param {Injector} injector The angular injector service.
   */
  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.refresh().subscribe(result => {
      if (result === true) {
        this.scheduleRenewal();
      } else {
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Gets the current user authorization informations.
   * @property
   */
  get authInfo(): AuthModel {
    return this.storage.getItem<AuthModel>(authKey);
  }

  /**
   * Sets the current user authorization informations.
   * @property
   */
  set authInfo(value: AuthModel) {
    this.storage.setItem<AuthModel>(authKey, value);
  }

  /**
   * Gets the current user token.
   * @readonly
   * @property
   */
  get token(): string {
    return this.authInfo && this.authInfo.token;
  }

  /**
   * Gets the current user rights.
   * @property {string[]}
   */
  get rights(): string[] {
    return this.storage.getItem<string[]>(userRightsKey) || [];
  }

  /**
   * Sets the current user rights.
   * @property {string[]}
   */
  set rights(value: string[]) {
    this.storage.setItem<string[]>(userRightsKey, value);

    // emit event for rights changed.
    this.rightsChanged.emit();
  }

  /**
   * Gets a value indicating whether user is logged in.
   * @method
   * @return {boolean} Value indicating whether user is logged in.
   */
  loggedIn() {
    const helper = new JwtHelperService();
    const isLoggedIn = !helper.isTokenExpired(this.token);
    if (!isLoggedIn) {
      this.rights = null;
    }

    return isLoggedIn;
  }

  /**
   * Log the user in.
   * @method
   * @param {LoginModel} credentials The current user login model.
   * @return {Observable<boolean>} Value indicating whether user is logged.
   */
  login(credentials: LoginModel): Observable<boolean> {
    return this.http.post(`${this.baseUrl}auth`, JSON.stringify(credentials), options).pipe(
      map((data: AuthModel) => {

        if (!data || !data.token) {
          return false;
        }

        this.authInfo = {
          username: data.username,
          token: data.token,
          refresh: data.refresh
        };

        this.rights = data.rights || [];
        this.scheduleRenewal();
        return true;
      })
    );
  }

  /**
   * Log the user in.
   * @method
   * @param {LoginModel} credentials The current user login model.
   * @return {Observable<boolean>} Value indicating whether user is logged.
   */
  register(credentials: LoginModel): Observable<boolean> {
    return this.http.post(`${this.baseUrl}auth`, JSON.stringify(credentials), options).pipe(
      map((response: Response) => {
        const data = response.json();

        if (!data || !data.token) {
          return false;
        }

        this.authInfo = {
          username: data.username,
          token: data.token,
          refresh: data.refresh
        };

        this.rights = data.rights || [];

        return true;
      }));
  }

  /**
   * Refresh the user token.
   * @method
   * @return {Observable<boolean>} Value indicating whether user token is refreshed.
   */
  refresh(): Observable<boolean> {
    if (!this.authInfo) {
      this.router.navigate(['']);
      return of(false);
    }
    return this.http.post(`${this.baseUrl}token`, JSON.stringify({ 'refresh': this.authInfo.refresh }), options).pipe(
      map((data: AuthModel) => {
        if (!data || !data.token) {
          return false;
        }
        const authInfo = Object.assign({}, this.authInfo); // { ...this.authInfo };
        authInfo.token = data.token;
        authInfo.username = data.username;
        this.authInfo = authInfo;

        this.rights = data.rights || [];

        return true;
      }));
  }

  /**
   * Reinitialize the user password.
   * @method
   * @param {string} username The username to reinit.
   * @return {Observable<boolean>} Value indicating whether user password is reinit.
   */
  reinitPassword(username: string): Observable<boolean> {
    console.log('[TODO]: Create reset password API call');
    return of(true);
  }

  /**
   * Log the user out.
   * @method
   */
  logout() {
    return this.http.post(`${this.baseUrl}token/reject`, JSON.stringify({ 'refresh': this.authInfo.refresh }), options).pipe(
      map((response: Response) => {
        this.storage.setItem(authKey, null);
        this.rights = null;
        return true;
      })
    );
  }

  /**
   * Gets the rights changed event emitter.
   * @method
   * @returns {EventEmitter<void>}
   */
  getRightsChangedEmitter() {
    return this.rightsChanged;
  }

  public scheduleRenewal() {
    if (!this.loggedIn()) {
      return;
    }
    this.unscheduleRenewal();
    const helper = new JwtHelperService();
    const expiresAt = helper.getTokenExpirationDate(this.authInfo.token).getTime();

    const source = of(expiresAt).pipe(
      flatMap(
        expiresAtValue => {
          const now = Date.now();

          // Use the delay in a timer to
          // run the refresh at the proper time
          return timer(Math.max(1, expiresAt - now));
        })
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.refresh().subscribe(result => {
        if (result === true) {
          this.scheduleRenewal();
        }
      });
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) {
      return;
    }
    this.refreshSubscription.unsubscribe();
  }
}
