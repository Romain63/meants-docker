import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { BaseListComponent } from '../../core/base-list-component';
import { ListFormParams } from '../../core/list-form-params';
import { MdDialog } from '@angular/material';
import { MeasureService } from './measure.service';
import { MeasureModel } from './measure-model';


@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent extends BaseListComponent<MeasureModel, ListFormParams> implements OnInit {


  /**
   * Initializes a new instance of the Measure Component.
   * @constructor
   * @param {MeasureService} measureService The application measure service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   */
  constructor(
    private measureService: MeasureService,
    formBuilder: FormBuilder,
    confirmDialog: MdDialog,
  ) {
    super(formBuilder, confirmDialog);
  }


  /**
   * Occurred when component initializes.
   * @method
   */
  ngOnInit() {
    super.ngOnInit();
    this.dataSource._sort.active = 'name';
    this.dataSource._sort.direction = 'asc';
  }

  /**
   * Gets all the element for a page.
   * @method
   * @param {ListFormParams} parameters The current search parameters.
   * @returns {Observable<TEntity[]>}
   */
  getAll(parameters?: ListFormParams) {
    return this.measureService.all(parameters);
  }

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  getTotal(search?: string) {
    return this.measureService.allCount(search);
  }

  /**
   * Delete an element.
   * @method
   * @param {MeasureModel} entity The current entity to delete.
   * @returns {Observable<any>}
   */
  deleteEntity(entity: MeasureModel) {
    return this.measureService.remove(entity.id);
  }
}
