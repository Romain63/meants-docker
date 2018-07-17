import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable ,  Subscription } from 'rxjs';






import { UsersService } from './users.service';
import { UserModel } from './user-model';
import { environment } from '../../../environments/environment';
import { BaseListComponent } from '../../core/base-list-component';
import { ListFormParams } from '../../core/list-form-params';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseListComponent<UserModel, ListFormParams> implements OnInit {

  /**
   * Initializes a new instance of the UsersComponent.
   * @constructor
   * @param {UsersService} usersService The application users service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   */
  constructor(
    private usersService: UsersService,
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
    this.dataSource._sort.active = 'email';
    this.dataSource._sort.direction = 'asc';
  }

  /**
   * Gets all the element for a page.
   * @method
   * @param {ListFormParams} parameters The current search parameters.
   * @returns {Observable<TEntity[]>}
   */
  getAll(parameters?: ListFormParams) {
    return this.usersService.all(parameters);
  }

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  getTotal(search?: string) {
    return this.usersService.allCount(search);
  }

  /**
   * Delete an element.
   * @method
   * @param {UserModel} entity The current entity to delete.
   * @returns {Observable<any>}
   */
  deleteEntity(entity: UserModel) {
    return this.usersService.remove(entity.id);
  }
}
