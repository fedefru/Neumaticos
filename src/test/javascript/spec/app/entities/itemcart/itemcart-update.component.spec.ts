import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NeumaticosTestModule } from '../../../test.module';
import { ItemcartUpdateComponent } from 'app/entities/itemcart/itemcart-update.component';
import { ItemcartService } from 'app/entities/itemcart/itemcart.service';
import { Itemcart } from 'app/shared/model/itemcart.model';

describe('Component Tests', () => {
  describe('Itemcart Management Update Component', () => {
    let comp: ItemcartUpdateComponent;
    let fixture: ComponentFixture<ItemcartUpdateComponent>;
    let service: ItemcartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [ItemcartUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemcartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemcartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemcartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Itemcart(123);
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
        const entity = new Itemcart();
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
