import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import { AuthorizationGuardService } from './authorization-guard.service';

/**
 * Represents the authorization guard.
 * @class
 */
@Injectable()
export class AuthorizationChildGuard implements CanActivateChild {
  /**
   * Initialize the AuthorizationGuard class.
   * @constructor
   * @param {AuthorizationGuardService} authorizationGuardService The application authorization guard service.
   */
  constructor(private authorizationGuardService: AuthorizationGuardService) { }

  /**
   * Gets a value indicating whether router can activate a child route, depending on user authentication.
   * @method
   * @param {ActivatedRouteSnapshot} route The activated route snapshot.
   * @param {RouterStateSnapshot} state The router state snapshot.
   * @return {boolean} Value indicating whether route can be activated.
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    if (!this.authorizationGuardService.promise) {
      this.authorizationGuardService.promise = this.authorizationGuardService.checkLogin(url);
    }
    return this.authorizationGuardService.promise.then(data => {
      this.authorizationGuardService.promise = null;
      return data;
    });
  }
}
