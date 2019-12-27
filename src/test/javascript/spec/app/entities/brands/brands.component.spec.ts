import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NeumaticosTestModule } from '../../../test.module';
import { BrandsComponent } from 'app/entities/brands/brands.component';
import { BrandsService } from 'app/entities/brands/brands.service';
import { Brands } from 'app/shared/model/brands.model';

describe('Component Tests', () => {
  describe('Brands Management Component', () => {
    let comp: BrandsComponent;
    let fixture: ComponentFixture<BrandsComponent>;
    let service: BrandsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [BrandsComponent],
        providers: []
      })
        .overrideTemplate(BrandsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BrandsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BrandsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Brands(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.brands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
