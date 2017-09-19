import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { MdDialog, MdDialogRef } from '@angular/material';

import { LanguageModel } from '../language-model';
import { ResourceModel } from '../resource-model';
import { LanguagesService } from '../languages.service';
import { environment } from '../../../../environments/environment';
import { BaseListComponent } from '../../../core/base-list-component';
import { ListFormParams } from '../../../core/list-form-params';
import { LanguageResourcesDialogComponent } from './resources-dialog.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent extends BaseListComponent<ResourceModel, ListFormParams> implements OnInit, OnDestroy {

  /** Gets or sets the language identifier @property {string} */
  languageId: string;

  /** Gets or sets the language model @property {LanguageModel} */
  language: LanguageModel;

  /** Gets or sets the route subscription @property {Subscription} */
  routeSub: Subscription;

  /** Gets or sets the filters form group. @property {FormGroup} */
  filterForm: FormGroup;

  /** Gets or sets the edition form group. @property {FormGroup} */
  editForm: FormGroup;

  /** Gets or sets the current edit action. @property {string} */
  action: string;

  /** Gets or sets a value indicating whether edit form is submitted. @property {boolean} */
  isSubmitted = false;

  /** Gets or sets the child edit modal. @property {any} */
  @ViewChild('editModal') public editModal: any;

  /**
   * Initializes a new instance of the ResourcesComponent.
   * @constructor
   * @param {ActivatedRoute} route The current activated route.
   * @param {Router} router The angular router service.
   * @param {LanguagesService} service The application languages service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   * @param {TranslateService} translateService The angular translate service.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LanguagesService,
    public dialog: MdDialog,
    public confirmDialog: MdDialog,
    formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    super(formBuilder, confirmDialog);
  }

  /**
   * Executed on component initializes.
   * @method
   */
  ngOnInit() {
    super.ngOnInit();
    this.dataSource._sort.active = 'key';
    this.dataSource._sort.direction = 'asc';
    this.initEditForm();

    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.languageId = params['id'];
      if (this.languageId === '') {
        this.language = undefined;
        return;
      }

      this.service.getById(this.languageId).subscribe(data => this.language = data);

    });
  }

  /**
   * Executed on component destroy.
   * @method
   */
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  /**
   * Gets all the element for a page.
   * @method
   * @param {ListFormParams} parameters The current search parameters.
   * @returns {Observable<TEntity[]>}
   */
  getAll(parameters?: ListFormParams) {
    return this.service.allResources(this.languageId, parameters);
  }

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  getTotal(search?: string) {
    return this.service.allResourcesCount(this.languageId, search);
  }

  /**
   * Initializes the component edition formular.
   * @method
   */
  initEditForm() {
    // initialize the edit form.
    this.editForm = this.formBuilder.group({
      id: '',
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  /**
   * Hide the edition modal.
   * @method
   */
  public hideEditModal(): void {
    this.isSubmitted = false;
  }

  /**
   * Delete an element.
   * @method
   * @param {ResourceModel} entity The current entity to delete.
   * @returns {Observable<any>}
   */
  deleteEntity(entity: ResourceModel) {
    return this.service.removeResource(this.languageId, entity.id);
  }

  public openDialog(resourceModel: ResourceModel) {
    const dialogRef = this.dialog.open(LanguageResourcesDialogComponent);
    dialogRef.componentInstance.languageId = this.languageId;

    if (resourceModel !== undefined) {
      dialogRef.componentInstance.setResourceModel(resourceModel);
    }
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.refresh();
      console.log(dialogRef.componentInstance.getResourceModel())
    });
  }
}
