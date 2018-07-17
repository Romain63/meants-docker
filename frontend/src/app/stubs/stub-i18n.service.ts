import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

// import { I18nModel } from '../i18n/i18n.model';

export const I18n_MODEL = [
    { code: 'core.login', value: 'Login' }
];

@Injectable()
export class StubI18nService {
    constructor(private http: HttpClient, private authHttp: HttpClient) { }

    getKeys(platform: string, term?: string) {
        return of(I18n_MODEL);
    }

    updateKey(platform: string, model: any) {
        return of(model);
    }
}
