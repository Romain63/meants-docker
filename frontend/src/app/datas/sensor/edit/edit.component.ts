import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SensorModel } from '../sensor-model';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  /** Gets or sets the sensor model @property {SensorModel} */
  sensor: SensorModel;

  /** Gets or sets the route subscription @property {Subscription} */
  routeSub: Subscription;

  /**
   * Initializes a new instance of the EditComponent class.
   * @constructor
   * @param {ActivatedRoute} route The current activated route.
   * @param {Router} router The angular router service.
   * @param {SensorService} service The application sensor service.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SensorService
  ) { }

  /**
   * Executed on component initializes.
   * @method
   */
  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      const sensorId = params['id'];
      if (!sensorId || sensorId.replace(/ /ig, '') === '') {
        this.sensor = undefined;
        return;
      }

      this.service.getById(sensorId).subscribe(data => this.sensor = data);
    });
  }

  /**
   * Executed on component destroy.
   * @method
   */
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  /**
   * Executed on sensor submitted.
   * @method
   * @param {SensorModel} data The changed sensor model to save.
   */
  onSensorSubmitted(data: SensorModel) {
    this.service.update(data).subscribe((response) => {
      this.sensor = response;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
