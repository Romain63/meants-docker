import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {SensorService } from '../sensor.service';
import { SensorModel } from '../sensor-model';

@Component({
  selector: 'app-create-or-update',
  templateUrl: './create-or-update.component.html',
  styleUrls: ['./create-or-update.component.scss']
})
export class CreateOrUpdateComponent implements OnChanges {

  /** Gets or sets the sensor model @property {number} */
  @Input() sensor: SensorModel;

  /** Gets or sets the sensor submitted event @property {number} */
  @Output() sensorSubmitted = new EventEmitter();

  /** Gets or sets the filters form group. @property {FormGroup} */
  form: FormGroup;

  /** Gets or sets a value indicating whether form is submitted @property {boolean} */
  isSubmitted = false;


  /**
   * Gets the current edition action
   * @readonly
   * @property {string}
   */
  get action() {
    return this.sensor && this.sensor.id !== '' ? 'edit' : 'create';
  }


  /**
   * Initializes a new instance of the CreateOrUpdateComponent.
   * @constructor
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {SensorService} sensorService The application sensor service.
   */
  constructor(
    private formBuilder: FormBuilder,
    private service: SensorService
  ) {
    this.initialize();
  }

  /**
   * Execute when component is initialized.
   * @method
   */
  initialize() {
    this.form = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      description: '',
      identifier: ['', Validators.required],
      room: ['', Validators.required],
    });
  }

  /**
   * Execute when component input changes.
   * @method
   * @param {SimpleChanges} changes The list of changed input.
   */
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (!this.sensor) {
      return;
    }

    this.form.setValue(this.sensor, { onlySelf: true });
  }

  /**
   * Execute when sensor click on submit button.
   * @method
   * @param {Event} event The current click event.
   */
  save(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    if (!this.form.valid) {
      return;
    }

    this.sensorSubmitted.emit(this.form.value);
  }

}
