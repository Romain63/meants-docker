import { OnDestroy, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject, Subject, fromEvent, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { ListFormParams } from './list-form-params';
import { MatDialog } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class TotalModel {
    /** Gets or sets the total number of elements. @property {number} */
    count: number;
}

/**
 * Base list component for managing pagination and sorting for a list.
 * @class
 */
export abstract class BaseListComponent<TEntity, TListFormParams extends ListFormParams> implements OnInit, OnDestroy {

    /** Table view paginator */
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /** Handle sorting on table view */
    @ViewChild(MatSort) sort: MatSort;

    /** To filter the data list */
    @ViewChild('filter') filter: ElementRef;

    /**
     * Datasource to handle component list
     */
    dataSource: CustomDataSource<TEntity, TListFormParams> | null;

    /**
     * Behavior subject for data changes on list
     */
    dataChange: BehaviorSubject<TEntity[]> = new BehaviorSubject<TEntity[]>([]);

    /**
     * Initializes a new instance of the {BaseListComponent}
     * @constructor
     * @param {FormBuilder} formBuilder The angular form builder.
     * @param {NgbModal} modalService The bootstrap modal service.
     */
    constructor(
        protected formBuilder: FormBuilder,
        public confirmDialog: MatDialog,
    ) {
    }

    /**
     * Occurred when component initializes.
     * @method
     */
    ngOnInit() {
        this.dataSource = new CustomDataSource(this, this.paginator, this.sort);
        if (this.filter !== undefined) {
            fromEvent(this.filter.nativeElement, 'keyup').pipe(
                debounceTime(150),
                distinctUntilChanged()
            ).subscribe(() => {
                    if (!this.dataSource) { return; }
                    this.dataSource.filter = this.filter.nativeElement.value;
                });
        }
    }

    /**
     * Occurred when component initializes.
     * @method
     */
    ngOnDestroy() {
    }

    /**
     * Gets all the element for a page.
     * @method
     * @param {ListFormParams} parameters The current search parameters.
     * @returns {Observable<TEntity[]>}
     */
    abstract getAll(parameters?: ListFormParams): Observable<TEntity[]>;

    /**
     * Gets the total number of element.
     * @method
     * @param {string} search The searching terms.
     * @returns {Observable<TotalModel>}
     */
    abstract getTotal(search?: string): Observable<TotalModel>;

    /**
     * Confirm an element deletion.
     * @method
     * @param {Event} event The current click event.
     * @param {TEntity} entity The current entity to delete.
     */
    confirmDeleteContent(event: Event, entity: TEntity) {
        event.preventDefault();

        const dialogRef = this.confirmDialog.open(ConfirmModalComponent);
        dialogRef.componentInstance.descriptionCode = 'common.data.delete';


        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined && result === true) {
                this.deleteEntity(entity).subscribe(() => this.dataSource.refresh());
            }
            return;
        });
    }

    /**
     * Delete an element.
     * @method
     * @param {TEntity} entity The current entity to delete.
     * @returns {Observable<any>}
     */
    abstract deleteEntity(entity: TEntity): Observable<any>;
}


export class CustomDataSource<TEntity, TListFormParams extends ListFormParams> extends DataSource<TEntity> {

    /**
     * Current datasource subject
     */
    subject: Subject<TEntity[]> = new BehaviorSubject<TEntity[]>(null);

    /**
     * Filter used to handle search for lists
     */
    searchFilter: ListFormParams = new ListFormParams();

    /**
     * Filter change behaviour subject
     */
    _filterChange = new BehaviorSubject('');

    /**
     * Get tje filter value
     */
    get filter(): string { return this._filterChange.value; }

    /**
     * Set the filter value
     */
    set filter(filter: string) { this._filterChange.next(filter); }


    /**
     * Total number of items on the list depending on search
     */
    totalLength: number;

    /**
     * Default constructor
     * @param _component Super component
     * @param _paginator List paginator component
     * @param _sort List sort component
     */
    constructor(private _component: BaseListComponent<TEntity, TListFormParams>, private _paginator: MatPaginator, public _sort: MatSort) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     */
    connect(): Observable<TEntity[]> {
        const displayDataChanges = [
            this._sort.sortChange,
            this._paginator.page,
            this._filterChange
        ];

        this.searchFilter.page = 0;
        this.searchFilter.limit = 5;

        /*return Observable.merge(...displayDataChanges).map(() => {
            const data = this._component.data.slice();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });*/
        merge(...displayDataChanges).subscribe((d) => {
            if (d['active'] !== undefined && d['direction'] !== undefined && d['active'] !== '' && d['direction'] !== '') {
                this.searchFilter.sort = d['active'] + ':' + d['direction'];
            }
            if (d['pageIndex'] !== undefined && d['pageIndex'] !== '') {
                this.searchFilter.page = d['pageIndex'];
            }
            if (d['pageSize'] !== undefined && d['pageSize'] !== '') {
                this.searchFilter.limit = d['pageSize'];
            }
            if (d['pageSize'] === undefined && d['pageIndex'] === undefined && d['active'] === undefined) {
                this.searchFilter.search = d;
                this.searchFilter.page = 0;
                this._paginator.pageIndex = 0;
            }
            this.getData(this.searchFilter);
        });

        if (!this.subject.isStopped) {
            this.getData(this.searchFilter);
        }
        return merge(this.subject);
    }

    /**
     * Refresh list datas
     */
    public refresh() {
        this.getData(this.searchFilter)
    }

    /**
     * Get the datas to display
     * @param searchFilter Filter to search
     */
    private getData(searchFilter: ListFormParams) {
        const totalObservable = this._component.getTotal();
        const datasObservable = this._component.getAll(searchFilter);

        totalObservable.subscribe((dto: TotalModel) => {
            datasObservable.subscribe((datas: TEntity[]) => {
                this.subject.next(datas);
                this.totalLength = dto.count;
            })
        })
    }

    /**
     * Datasource disconnect
     */
    disconnect() {
        this.subject.complete();
        this.subject.observers = [];
    }
}
