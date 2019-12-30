import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from '../../entities/product/product.service';

import { JhiLanguageHelper } from 'app/core/language/language.helper';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  items: IProduct[];

  constructor(protected productService: ProductService, private jhiLanguageHelper: JhiLanguageHelper, private router: Router) {}

  loadAll() {
    this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => {
      this.items = res.body;
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'neumaticosApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    //this.items = ['item1', 'item2', 'item3' ,'item4'];
    this.loadAll();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }
}
