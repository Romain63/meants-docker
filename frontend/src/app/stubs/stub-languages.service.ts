import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export const LanguagesModel = [];
for (let i = 0; i < 10; i++) {
  LanguagesModel.push({
    id: i.toString(),
    name: 'language_' + i,
    flag: 'flag_' + i,
    culture: 'culture_' + i
  });
}

@Injectable()
export class StubLanguagesService {
    constructor(private http: HttpClient) { }

    all(parameters?: any) {
        return of(LanguagesModel);
    }
}
