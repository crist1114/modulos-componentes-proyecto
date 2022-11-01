import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    ImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    ImgComponent
  ]
})
export class SharedModule { }
