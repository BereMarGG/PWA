import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingLoginSuccessPage } from './loading-login-success.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingLoginSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingLoginSuccessPageRoutingModule {}
