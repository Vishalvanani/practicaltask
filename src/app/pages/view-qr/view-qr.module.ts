import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewQRPageRoutingModule } from './view-qr-routing.module';

import { ViewQRPage } from './view-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewQRPageRoutingModule
  ],
  declarations: [ViewQRPage]
})
export class ViewQRPageModule {}
