import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../core/translate-resolver';
import { DashboardComponent } from './dashboard.component';
import * as Guards from './guards';

const routes: Routes = [
  {
    path: '', canActivate: [Guards.DashboardGuard],
    data: {
      code: 'admin.menu.dashboard.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      {
        path: '', component: DashboardComponent,
        data: {
          code: 'admin.menu.dashboard.list'
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
export class DashboardRoutingModule { }
