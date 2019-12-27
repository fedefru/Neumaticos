import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NeumaticosTestModule } from '../../../test.module';
import { MeasureComponent } from 'app/entities/measure/measure.component';
import { MeasureService } from 'app/entities/measure/measure.service';
import { Measure } from 'app/shared/model/measure.model';

describe('Component Tests', () => {
  describe('Measure Management Component', () => {
    let comp: MeasureComponent;
    let fixture: ComponentFixture<MeasureComponent>;
    let service: MeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [MeasureComponent],
        providers: []
      })
        .overrideTemplate(MeasureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeasureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeasureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Measure(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.measures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
