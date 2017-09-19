/**
 * Represents the list form params.
 * @class
 */
export class ListFormParams {
    /** Gets or sets the list search text input. @property {string} */
    search?: string;

    /** Gets or sets the current page. @property {number} */
    page: number;

    /** Gets or sets the page element limit. @property {number} */
    limit: number;

    /** Gets or sets the sorting list string. @property {string} */
    sort: string;
}
