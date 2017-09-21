import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MeasureService } from '../datas/measure/measure.service';
import { SensorService } from '../datas/sensor/sensor.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { USERS_GUARD_PROVIDERS } from './guards';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    USERS_GUARD_PROVIDERS,
    MeasureService,
    SensorService
  ]
})
export class DashboardModule { }
