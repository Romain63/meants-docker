import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardGuard } from './admin-dashboard-guard';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatCardModule
  ],
  declarations: [
    AdminComponent
  ],
  providers: [AdminDashboardGuard]
})
export class AdminModule { }
