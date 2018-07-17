import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const USER_MODEL = {
    username: 'yannick.raffin',
    email: 'yannick.raffin@modisfrance.fr'
};

@Injectable()
export class StubAccountService {
    constructor(private http: HttpClient) { }

    getUserInfo() {
        return of(USER_MODEL);
    }
}
