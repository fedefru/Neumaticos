import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { NeumaticosSharedModule } from 'app/shared/shared.module';
import { NeumaticosCoreModule } from 'app/core/core.module';
import { NeumaticosAppRoutingModule } from './app-routing.module';
import { NeumaticosHomeModule } from './home/home.module';
import { NeumaticosEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { CarouselHomeComponent } from './componentes/carousel-home/carousel-home.component';
import { ProductItemComponent } from './componentes/product-list/product-item/product-item.component';

@NgModule({
  imports: [
    BrowserModule,
    NeumaticosSharedModule,
    NeumaticosCoreModule,
    NeumaticosHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    NeumaticosEntityModule,
    NeumaticosAppRoutingModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    CarouselHomeComponent,
    ProductItemComponent
  ],
  bootstrap: [JhiMainComponent]
})
export class NeumaticosAppModule {}
