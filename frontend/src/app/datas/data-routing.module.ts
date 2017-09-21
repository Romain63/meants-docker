import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../core/translate-resolver';
import { MeasureComponent } from './measure/measure.component';
import { SensorComponent } from './sensor/sensor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      code: 'admin.menu.users.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      { path: 'measure', component: MeasureComponent },
      {
        path: 'sensor',
        loadChildren: './sensor/sensor.module#SensorModule',
      },
      { path: '**', redirectTo: 'measure', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DataRoutingModule { }
