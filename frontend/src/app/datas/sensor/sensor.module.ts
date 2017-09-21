import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SensorRoutingModule } from './sensor-routing.module';
import { SensorComponent } from './sensor.component';
import { SensorService } from './sensor.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CreateOrUpdateComponent } from './create-or-update/create-or-update.component';
import { USERS_GUARD_PROVIDERS } from './guards';

@NgModule({
  imports: [
    SharedModule,
    SensorRoutingModule
  ],
  declarations: [
    SensorComponent,
    CreateComponent,
    EditComponent,
    CreateOrUpdateComponent,
  ],
  providers: [
    SensorService,
    USERS_GUARD_PROVIDERS
  ]
})
export class SensorModule { }
