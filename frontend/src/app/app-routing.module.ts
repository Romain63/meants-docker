import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ForbiddenComponent } from './authentication/forbidden/forbidden.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { AuthorizationGuard, AuthorizationChildGuard } from './authentication/guards';
import { DataRoutingModule } from './datas/data-routing.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationChildGuard],
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule',
      }
    ]
  },
  {
    path: 'data',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './datas/data.module#DataModule',
      }
    ]
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      }
    ]
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
