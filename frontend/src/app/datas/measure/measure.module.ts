import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MeasureRoutingModule } from './measure-routing.module';
import { MeasureComponent } from './measure.component';
import { MeasureService } from './measure.service';
import { USERS_GUARD_PROVIDERS } from './guards';

@NgModule({
  imports: [
    SharedModule,
    MeasureRoutingModule
  ],
  declarations: [
    MeasureComponent,
  ],
  providers: [
    MeasureService,
    USERS_GUARD_PROVIDERS
  ]
})
export class MeasureModule { }
