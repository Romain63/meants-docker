import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';


import { StorageService } from '../../core/storage.service';
import { AuthorizationService } from '../authorization.service';
import { BaseTranslationComponent } from '../../core/base-translation-component';
import { catchError } from 'rxjs/operators';

/**
 * Represents the login component.
 * @class
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseTranslationComponent implements OnInit {

  /**
   * Gets or sets the login form group.
   * @property {FormGroup}
   */
  loginForm: FormGroup;

  /**
   * Gets or sets a value indicating whether login form is submitted.
   * @property {boolean}
   */
  loginFormSubmitted = false;

  /** Value indicating whether authentication failed @property {boolean} */
  authenticationFailed = false;

  /**
   * Initializes a new instance of the LoginComponent class.
   * @constructor
   * @param {Router} router The current router.
   * @param {HttpClient} http The current http service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {AuthorizationService} authorizationService The application authorization service.
   * @param {StorageService} storage The application storage service.
   * @param {TranslateService} translateService The angular translate service.
   */
  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    storage: StorageService,
    translateService: TranslateService
  ) {
    super(storage, translateService);
  }

  /**
   * Execute when component is initialized.
   * @method
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Log the user in.
   * @method
   * @param {Event} event The current click event.
   */
  login(event: Event) {
    event.preventDefault();
    this.loginFormSubmitted = true;
    this.authenticationFailed = false;
    if (!this.loginForm.valid) {
      return;
    }

    this.authorizationService.login(this.loginForm.value).pipe(
      catchError((error) => {
        this.authenticationFailed = true;
        return of({});
      })
    ).subscribe(response => {
      if (this.authenticationFailed) {
        return;
      }

      const redirect = this.authorizationService.redirectUrl || '';
      this.router.navigate([redirect]);
    });
  }

}
