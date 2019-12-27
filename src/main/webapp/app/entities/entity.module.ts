import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.NeumaticosUsuariosModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./brands/brands.module').then(m => m.NeumaticosBrandsModule)
      },
      {
        path: 'measure',
        loadChildren: () => import('./measure/measure.module').then(m => m.NeumaticosMeasureModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.NeumaticosProductModule)
      },
      {
        path: 'method',
        loadChildren: () => import('./method/method.module').then(m => m.NeumaticosMethodModule)
      },
      {
        path: 'itemcart',
        loadChildren: () => import('./itemcart/itemcart.module').then(m => m.NeumaticosItemcartModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.NeumaticosCartModule)
      },
      {
        path: 'branch',
        loadChildren: () => import('./branch/branch.module').then(m => m.NeumaticosBranchModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.NeumaticosStockModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class NeumaticosEntityModule {}
