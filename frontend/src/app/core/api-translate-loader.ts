import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export const showTranslationKey = 'app.stc';

declare class TranslateModel {
    key: string;
    value: string;
}

/**
 * Api translate loader.
 * @class
 */
export class ApiTranslateLoader {

    /**
     * Initializes anew instance of the ApiTranslateLoader class.
     * @constructor
     * @param {HttpClient} http The angular http service.
     * @param {StorageService} storage The application storage service.
     * @param {string} url The url translations.
     */
    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private url: string
    ) {
    }

    /**
     * Gets the translations from the server.
     * @param {string} lang The language to search for.
     * @returns {any}
     */
    getTranslation(lang: string) {
        const show = this.storage.getItem<boolean>(showTranslationKey) || false;

        return this.http.get(`${this.url}/${lang}/display?timestamp=${Date.now()}`).pipe(
            map((data: TranslateModel[]) => {
                const result = new Map<string, string>();
                data.forEach(element => {
                    result[element.key] = show ? element.key + ' (' + element.value + ')' : element.value;
                });

                return result;
            })
        );
    }
}

/**
 * Function which represents the translate loader factory.
 * @method
 * @param {HttpClient} http The angular http service.
 * @param {StorageService} storage The application storage service.
 * @return {ApiTranslateLoader}
 */
export function apiTranslateLoaderFactory(http: HttpClient, storage: StorageService) {
    return new ApiTranslateLoader(http, storage, `${environment.apiUrlBase}api/languages`);
}
