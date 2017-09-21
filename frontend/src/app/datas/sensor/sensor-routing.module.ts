import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../../core/translate-resolver';
import { SensorComponent } from './sensor.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import * as Guards from './guards';

const routes: Routes = [
  {
    path: '', canActivate: [Guards.SensorGuard],
    data: {
      code: 'admin.menu.sensor.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      {
        path: '', component: SensorComponent,
        data: {
          code: 'admin.menu.sensor.list'
        },
        resolve: {
          title: TranslateResolver
        }
      },
      {
        path: 'new', component: CreateComponent, canActivate: [Guards.SensorCreateGuard],
        data: {
          code: 'admin.menu.sensor.create'
        },
        resolve: {
          title: TranslateResolver
        }
      },
      {
        path: ':id/update', component: EditComponent, canActivate: [Guards.SensorUpdateGuard],
        data: {
          code: 'admin.menu.sensor.update'
        },
        resolve: {
          title: TranslateResolver
        }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SensorRoutingModule { }
