import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationModule } from '../authentication/authentication.module';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { KeysPipe } from './keys.pipe';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdDialogModule } from '@angular/material';

import {
  MdTableModule, MdPaginatorModule, MdSortModule, MdInputModule, MdButtonModule, MdTabsModule,
  MdSnackBarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AuthenticationModule,
    FlexLayoutModule,
    MdDialogModule,
    MaterialModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule,
    MdInputModule,
    CdkTableModule,
    MdButtonModule,
    MdTabsModule,
    MdSnackBarModule
  ],
  declarations: [
    BreadcrumbsComponent,
    KeysPipe,
    ConfirmModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AuthenticationModule,
    BreadcrumbsComponent,
    KeysPipe,
    FlexLayoutModule,
    MdDialogModule,
    MaterialModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule,
    MdInputModule,
    CdkTableModule,
    MdButtonModule
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  };
}
