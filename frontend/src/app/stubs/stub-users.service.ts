import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '../../../node_modules/@types/selenium-webdriver/http';

export const UsersModel = [];
for (let i = 0; i < 10; i++) {
  UsersModel.push({
    id: i.toString(),
    username: 'user_' + i,
    email: 'user_ ' + i + '@test.fr',
  });
}

@Injectable()
export class StubUsersService {
    constructor(private http: HttpClient) { }

    all(parameters?: any) {
        return of(UsersModel);
    }
}
