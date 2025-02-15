import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingLoginSuccessPageRoutingModule } from './loading-login-success-routing.module';

import { LoadingLoginSuccessPage } from './loading-login-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingLoginSuccessPageRoutingModule
  ],
  declarations: [LoadingLoginSuccessPage]
})
export class LoadingLoginSuccessPageModule {}
