import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NeumaticosTestModule } from '../../../test.module';
import { BrandsDetailComponent } from 'app/entities/brands/brands-detail.component';
import { Brands } from 'app/shared/model/brands.model';

describe('Component Tests', () => {
  describe('Brands Management Detail Component', () => {
    let comp: BrandsDetailComponent;
    let fixture: ComponentFixture<BrandsDetailComponent>;
    const route = ({ data: of({ brands: new Brands(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [BrandsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BrandsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BrandsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.brands).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
