import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NeumaticosTestModule } from '../../../test.module';
import { ItemcartComponent } from 'app/entities/itemcart/itemcart.component';
import { ItemcartService } from 'app/entities/itemcart/itemcart.service';
import { Itemcart } from 'app/shared/model/itemcart.model';

describe('Component Tests', () => {
  describe('Itemcart Management Component', () => {
    let comp: ItemcartComponent;
    let fixture: ComponentFixture<ItemcartComponent>;
    let service: ItemcartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [ItemcartComponent],
        providers: []
      })
        .overrideTemplate(ItemcartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemcartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemcartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Itemcart(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.itemcarts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
