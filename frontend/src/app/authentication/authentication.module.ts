import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthorizationService } from './authorization.service';
import { HasRightDirective } from './has-right.directive';
import { USERS_GUARD_PROVIDERS } from './guards';
import { MatButtonModule, MatCardModule, MatInputModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    HasRightDirective,
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ForbiddenComponent
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ForbiddenComponent,
    HasRightDirective
  ]
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthorizationService,
        USERS_GUARD_PROVIDERS
      ]
    };
  };
}
