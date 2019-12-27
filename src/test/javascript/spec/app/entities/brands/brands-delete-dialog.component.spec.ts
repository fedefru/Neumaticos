import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NeumaticosTestModule } from '../../../test.module';
import { BrandsDeleteDialogComponent } from 'app/entities/brands/brands-delete-dialog.component';
import { BrandsService } from 'app/entities/brands/brands.service';

describe('Component Tests', () => {
  describe('Brands Management Delete Component', () => {
    let comp: BrandsDeleteDialogComponent;
    let fixture: ComponentFixture<BrandsDeleteDialogComponent>;
    let service: BrandsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [BrandsDeleteDialogComponent]
      })
        .overrideTemplate(BrandsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BrandsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BrandsService);
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
