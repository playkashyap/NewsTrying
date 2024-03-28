import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';

const apiService = (URL: any, Meathod: any, Body?: any) => {


    let Headers;
    if (Meathod === 'GET') {
        Headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    } else {
        Headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    const apiResponse = ajax({
        url: `http://localhost:4000/${URL}`,
        method: Meathod,
        headers: Headers,
        body: Body
    }).pipe(
        map(response => {
            return response;
        }),
        catchError(error => {
            return of(error);
        })
    );
    return apiResponse;
}

export default apiService;