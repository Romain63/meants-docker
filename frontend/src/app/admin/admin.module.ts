import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardGuard } from './admin-dashboard-guard';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    AdminRoutingModule,
    MatCardModule
  ],
  declarations: [
    AdminComponent
  ],
  providers: [AdminDashboardGuard]
})
export class AdminModule { }
