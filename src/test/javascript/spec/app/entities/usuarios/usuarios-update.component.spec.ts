import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NeumaticosTestModule } from '../../../test.module';
import { UsuariosUpdateComponent } from 'app/entities/usuarios/usuarios-update.component';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { Usuarios } from 'app/shared/model/usuarios.model';

describe('Component Tests', () => {
  describe('Usuarios Management Update Component', () => {
    let comp: UsuariosUpdateComponent;
    let fixture: ComponentFixture<UsuariosUpdateComponent>;
    let service: UsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeumaticosTestModule],
        declarations: [UsuariosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UsuariosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UsuariosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UsuariosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Usuarios(123);
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
        const entity = new Usuarios();
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
