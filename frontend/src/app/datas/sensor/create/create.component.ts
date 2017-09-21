import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SensorModel } from '../sensor-model';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  /** Gets or sets the sensor model @property {SensorModel} */
  sensor: SensorModel;

  /**
   * Initializes a new instance of the CreateComponent class.
   * @constructor
   * @param {ActivatedRoute} route The current activated route.
   * @param {Router} router The angular router service.
   * @param {SensorService} service The application sensor service.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SensorService
  ) {  }


  ngOnInit() {
  }

  onSensorSubmitted(data: SensorModel) {
    this.service.create(data).subscribe((response) => {
      this.sensor = response;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
