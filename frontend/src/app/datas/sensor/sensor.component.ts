import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { BaseListComponent } from '../../core/base-list-component';
import { ListFormParams } from '../../core/list-form-params';
import { MdDialog } from '@angular/material';
import { SensorService } from './sensor.service';
import { SensorModel } from './sensor-model';


@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent extends BaseListComponent<SensorModel, ListFormParams> implements OnInit {


  /**
   * Initializes a new instance of the Sensor Component.
   * @constructor
   * @param {SensorService} sensorService The application sensor service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   */
  constructor(
    private sensorService: SensorService,
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
    return this.sensorService.all(parameters);
  }

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  getTotal(search?: string) {
    return this.sensorService.allCount(search);
  }

  /**
   * Delete an element.
   * @method
   * @param {SensorModel} entity The current entity to delete.
   * @returns {Observable<any>}
   */
  deleteEntity(entity: SensorModel) {
    return this.sensorService.remove(entity.id);
  }
}
