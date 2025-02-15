import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingInitPageRoutingModule } from './loading-init-routing.module';

import { LoadingInitPage } from './loading-init.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingInitPageRoutingModule
  ],
  declarations: [LoadingInitPage]
})
export class LoadingInitPageModule {}
