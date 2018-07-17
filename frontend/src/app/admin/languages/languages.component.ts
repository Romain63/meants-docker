import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { LanguagesService } from './languages.service';
import { LanguageModel } from './language-model';
import { BaseListComponent } from '../../core/base-list-component';
import { ListFormParams } from '../../core/list-form-params';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent extends BaseListComponent<LanguageModel, ListFormParams> implements OnInit {

  /**
   * Initializes a new instance of the LanguagesComponent.
   * @constructor
   * @param {LanguagesService} languagesService The application languages service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   */
  constructor(
    private languagesService: LanguagesService,
    formBuilder: FormBuilder,
    public confirmDialog: MatDialog,
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
    return this.languagesService.all(parameters);
  }

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  getTotal(search?: string) {
    return this.languagesService.allCount();
  }

  /**
   * Delete an element.
   * @method
   * @param {LanguageModel} entity The current entity to delete.
   * @returns {Observable<any>}
   */
  deleteEntity(entity: LanguageModel) {
    return this.languagesService.remove(entity.id);
  }
}
