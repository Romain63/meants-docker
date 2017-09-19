import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardGuard } from './admin-dashboard-guard';

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent
  ],
  providers: [AdminDashboardGuard]
})
export class AdminModule { }
