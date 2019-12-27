import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NeumaticosTestModule } from '../../../test.module';
import { BrandsUpdateComponent } from 'app/entities/brands/brands-update.component';
import { BrandsService } from 'app/entities/brands/brands.service';
import { Brands } from 'app/shared/model/brands.model';

describe('Component Tests', () => {
  describe('Brands Management Update Component', () => {
    let comp: BrandsUpdateComponent;
    let fixture: ComponentFixture<BrandsUpdateComponent>;
    let service: BrandsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [BrandsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BrandsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BrandsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BrandsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Brands(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Brands();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
