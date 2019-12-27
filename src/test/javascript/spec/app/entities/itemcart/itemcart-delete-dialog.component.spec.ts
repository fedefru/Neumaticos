import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NeumaticosTestModule } from '../../../test.module';
import { ItemcartDeleteDialogComponent } from 'app/entities/itemcart/itemcart-delete-dialog.component';
import { ItemcartService } from 'app/entities/itemcart/itemcart.service';

describe('Component Tests', () => {
  describe('Itemcart Management Delete Component', () => {
    let comp: ItemcartDeleteDialogComponent;
    let fixture: ComponentFixture<ItemcartDeleteDialogComponent>;
    let service: ItemcartService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [ItemcartDeleteDialogComponent]
      })
        .overrideTemplate(ItemcartDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemcartDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemcartService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
