import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';
import { ModuleImportGuard } from './module-import-guard';
import { Logger } from './logger.service';
import { StorageService } from './storage.service';
import { errorHandlerFactory } from './app-error-handler';
import { apiTranslateLoaderFactory } from './api-translate-loader';
import { AuthenticationModule } from '../authentication/authentication.module';
import { TranslateResolver } from './translate-resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: apiTranslateLoaderFactory,
        deps: [HttpClient, StorageService]
      }
    }),
    BrowserAnimationsModule,
    AuthenticationModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [
    Logger,
    StorageService,
    TranslateResolver,
    {
      provide: ErrorHandler,
      useFactory: errorHandlerFactory,
      deps: [Logger]
    }
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule, translate: TranslateService, titleService: Title) {
    ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');

    // set default application language.
    translate.setDefaultLang('fr');

    // use fr language in application
    translate.use('fr');

    // set the document title
    translate.get(environment.title).subscribe((title) => titleService.setTitle(title));
  }
}
