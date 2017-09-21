import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../../core/translate-resolver';
import { MeasureComponent } from './measure.component';
import * as Guards from './guards';

const routes: Routes = [
  {
    path: '', canActivate: [Guards.MeasureGuard],
    data: {
      code: 'admin.menu.measure.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      {
        path: '', component: MeasureComponent,
        data: {
          code: 'admin.menu.measure.list'
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
export class MeasureRoutingModule { }
