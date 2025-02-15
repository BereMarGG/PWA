import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingInitPage } from './loading-init.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingInitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingInitPageRoutingModule {}
