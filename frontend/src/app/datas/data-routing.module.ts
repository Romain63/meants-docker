import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../core/translate-resolver';
import { MeasureComponent } from './measure/measure.component';

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
      { path: '', component: MeasureComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DataRoutingModule { }
