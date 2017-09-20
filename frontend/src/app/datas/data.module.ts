import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { ChartModule } from 'angular2-highcharts';
import { MeasureComponent } from './measure/measure.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ChartModule.forRoot(require('highcharts')),
    DataRoutingModule,
  ],
  declarations: [
    MeasureComponent
  ]
})
export class DataModule { }
