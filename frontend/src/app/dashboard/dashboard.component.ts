import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { MeasureService, MeasureFilter } from '../datas/measure/measure.service';
import { MeasureModel } from '../datas/measure/measure-model';
import { SensorService, SensorFilter } from '../datas/sensor/sensor.service';
import { SensorModel } from '../datas/sensor/sensor-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * Chart options
   */
  options: Object;

  /**
   * List of sensors
   */
  sensors: SensorModel[];

  constructor(private measureService: MeasureService, private sensorService: SensorService) {
    this.options = {
      title: { text: 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };

    this.sensors = new Array<SensorModel>();

    const filter: SensorFilter = new SensorFilter();
    filter.limit = 0;
    filter.page = 0;
    this.sensorService.all(filter).subscribe((datas: SensorModel[]) => {
      datas.forEach(sensor => {
        this.measureService.getLastMeasureBySensorId(sensor.id).subscribe((lastMeasure: MeasureModel) => {
          sensor.lastMeasure = lastMeasure;
          this.sensors.push(sensor);
        })
      });
    });
  }

  ngOnInit() {
  }
}

