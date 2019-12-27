import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMeasure } from 'app/shared/model/measure.model';
import { MeasureService } from './measure.service';
import { MeasureDeleteDialogComponent } from './measure-delete-dialog.component';

@Component({
  selector: 'jhi-measure',
  templateUrl: './measure.component.html'
})
export class MeasureComponent implements OnInit, OnDestroy {
  measures: IMeasure[];
  eventSubscriber: Subscription;

  constructor(protected measureService: MeasureService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.measureService.query().subscribe((res: HttpResponse<IMeasure[]>) => {
      this.measures = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInMeasures();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMeasure) {
    return item.id;
  }

  registerChangeInMeasures() {
    this.eventSubscriber = this.eventManager.subscribe('measureListModification', () => this.loadAll());
  }

  delete(measure: IMeasure) {
    const modalRef = this.modalService.open(MeasureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.measure = measure;
  }
}
