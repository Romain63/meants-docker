import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export const StatsModel = [];
for (let i = 0; i < 10; i++) {
  StatsModel.push({
    username: 'user_' + i,
    fullname: 'User ' + i,
    nbConnections: i * 5,
    averageTime: i * 2,
    hits: i * 8
  });
}

@Injectable()
export class StubStatisticsService {
    constructor() { }

    getTotalStatistics(parameters?: any) {
        return of({ count: StatsModel.length });
    }

    getStatistics(parameters?: any) {
        return of(StatsModel);
    }

    getStatisticsByContext(type: String, parameters?: any) {
        return of(StatsModel);
    }
}
