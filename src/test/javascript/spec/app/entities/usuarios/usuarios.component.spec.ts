import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NeumaticosTestModule } from '../../../test.module';
import { UsuariosComponent } from 'app/entities/usuarios/usuarios.component';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { Usuarios } from 'app/shared/model/usuarios.model';

describe('Component Tests', () => {
  describe('Usuarios Management Component', () => {
    let comp: UsuariosComponent;
    let fixture: ComponentFixture<UsuariosComponent>;
    let service: UsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [UsuariosComponent],
        providers: []
      })
        .overrideTemplate(UsuariosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UsuariosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UsuariosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Usuarios(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
