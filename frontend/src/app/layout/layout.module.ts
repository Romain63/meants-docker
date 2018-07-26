import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MatSidenavModule, MatMenuModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from '../admin/users/users.service';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule
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
