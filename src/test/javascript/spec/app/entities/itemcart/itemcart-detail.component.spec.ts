import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NeumaticosTestModule } from '../../../test.module';
import { ItemcartDetailComponent } from 'app/entities/itemcart/itemcart-detail.component';
import { Itemcart } from 'app/shared/model/itemcart.model';

describe('Component Tests', () => {
  describe('Itemcart Management Detail Component', () => {
    let comp: ItemcartDetailComponent;
    let fixture: ComponentFixture<ItemcartDetailComponent>;
    const route = ({ data: of({ itemcart: new Itemcart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [ItemcartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemcartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemcartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemcart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
