import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MdSidenavModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from '../admin/users/users.service';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule
  ],
  declarations: [
    AdminLayoutComponent
  ],
  exports: [
    AdminLayoutComponent
  ],
  providers: [
    UsersService
  ]
})
export class LayoutModule { }
