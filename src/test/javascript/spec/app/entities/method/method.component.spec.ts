import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NeumaticosTestModule } from '../../../test.module';
import { MethodComponent } from 'app/entities/method/method.component';
import { MethodService } from 'app/entities/method/method.service';
import { Method } from 'app/shared/model/method.model';

describe('Component Tests', () => {
  describe('Method Management Component', () => {
    let comp: MethodComponent;
    let fixture: ComponentFixture<MethodComponent>;
    let service: MethodService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [MethodComponent],
        providers: []
      })
        .overrideTemplate(MethodComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MethodComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MethodService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Method(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.methods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
