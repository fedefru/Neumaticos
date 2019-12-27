import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NeumaticosTestModule } from '../../../test.module';
import { MeasureDetailComponent } from 'app/entities/measure/measure-detail.component';
import { Measure } from 'app/shared/model/measure.model';

describe('Component Tests', () => {
  describe('Measure Management Detail Component', () => {
    let comp: MeasureDetailComponent;
    let fixture: ComponentFixture<MeasureDetailComponent>;
    const route = ({ data: of({ measure: new Measure(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [MeasureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MeasureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeasureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.measure).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
