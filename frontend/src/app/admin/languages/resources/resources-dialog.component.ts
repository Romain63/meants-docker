import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceModel } from '../resource-model';
import { LanguagesService } from '../languages.service';

@Component({
    selector: 'app-language-resources-dialog',
    templateUrl: './resources-dialog.component.html',
})
export class LanguageResourcesDialogComponent {

    /** Gets or sets the edition form group. @property {FormGroup} */
    public editForm: FormGroup;

    @Input()
    protected resourceModel: ResourceModel;

    public languageId: string;

    constructor(public dialogRef: MatDialogRef<LanguageResourcesDialogComponent>,
        public formBuilder: FormBuilder, private service: LanguagesService) {
        this.initEditForm();
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

    public setResourceModel(resourceModel: ResourceModel) {
        this.resourceModel = resourceModel;
        this.editForm.setValue(this.resourceModel, { onlySelf: true });
    }

    public getResourceModel(): ResourceModel {
        return this.resourceModel;
    }

    /**
     * Save the editing resource.
     * @method
     * @param {Event} event The current submit event.
     */
    public saveResource() {
        event.preventDefault();
        // this.isSubmitted = true;
        if (!this.editForm.valid) {
            return;
        }

        const isNew = !this.editForm.value.id;
        const result = !isNew ? this.service.updateResource(this.languageId, this.editForm.value)
            : this.service.createResource(this.languageId, this.editForm.value);

        result.subscribe(data => {
            this.dialogRef.close();
        });
    }
}
