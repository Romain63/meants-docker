import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../../core/storage.service';
import { BaseRigthsGuard } from '../../../core/base-rights-guard';
import { AuthorizationGuardService } from '../../../authentication/guards';

/**
 * Represents the admin sensors guard.
 * @class
 */
@Injectable()
export class MeasureGuard extends BaseRigthsGuard {
  /**
   * Initialize the MeasureGuard class.
   * @constructor
   * @param {AuthorizationGuardService} authorizationGuardService The application authorization guard service.
   * @param {StorageService} storageService The application storage service.
   * @param {Router} router The angular router service.
   */
  constructor(
    authorizationGuardService: AuthorizationGuardService,
    storageService: StorageService,
    router: Router
  ) {
    const rights = [
      'R_API_MEASURE_C',
      'R_API_MEASURE_R',
      'R_API_MEASURE_U',
      'R_API_MEASURE_D'
    ];
    super(authorizationGuardService, storageService, router, ...rights);
  }
}
