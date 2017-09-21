import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../core/translate-resolver';

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
      {
        path: 'measure',
        loadChildren: './measure/measure.module#MeasureModule',
      },
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
