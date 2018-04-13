import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Noticias } from '../interfaces/noticias';
import 'rxJs/Rx';
import { Months } from '../interfaces/months';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxJs/operator/map';
import { catchError } from 'rxJs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';



@Injectable()
export class SharepointService {


  url: string;

  meses: Months[] = [{
    'id': 0,
    'nameMonth': 'Enero',
    'shortNameMonth': 'ene',
    'days': 31
  },
  {
    'id': 1,
    'nameMonth': 'Febrero',
    'shortNameMonth': 'feb',
    'days': 29
  }, {
    'id': 2,
    'nameMonth': 'Marzo',
    'shortNameMonth': 'mar',
    'days': 31
  }, {
    'id': 3,
    'nameMonth': 'Abril',
    'shortNameMonth': 'abr',
    'days': 30
  },
  {
    'id': 4,
    'nameMonth': 'Mayo',
    'shortNameMonth': 'may',
    'days': 31
  },
  {
    'id': 5,
    'nameMonth': 'Junio',
    'shortNameMonth': 'Jun',
    'days': 30
  },
  {
    'id': 6,
    'nameMonth': 'Julio',
    'shortNameMonth': 'Jul',
    'days': 31
  },
  {
    'id': 7,
    'nameMonth': 'Agosto',
    'shortNameMonth': 'Ago',
    'days': 31
  },
  {
    'id': 8,
    'nameMonth': 'Septiembre',
    'shortNameMonth': 'Sep',
    'days': 30
  },
  {
    'id': 9,
    'nameMonth': 'Octubre',
    'shortNameMonth': 'Oct',
    'days': 31
  },
  {
    'id': 10,
    'nameMonth': 'Noviembre',
    'shortNameMonth': 'Nov',
    'days': 30
  },
  {
    'id': 11,
    'nameMonth': 'Diciembre',
    'shortNameMonth': 'Dic',
    'days': 31
  }];

  constructor(private _http: HttpClient) {
    this.url = this.getUrl();
  }


  getUrl() {
    let urlNow  = window.location.href;
    if (urlNow.indexOf('localhost') === -1) {
      return 'http://arvsrvdevsp13:14203/SiteAssets/timeline/data/data.txt';
    } else {
     return '../data/data.txt';
    }
  }

  getData(): Observable<any> | any {
    // tslint:disable-next-line:whitespace
    return this._http.get<any[]>(this.url)
      .pipe(
        catchError( err => this.handleError(err))
      );
  }

  private handleError(error: HttpErrorResponse) {
    let dataError: any = {
      error: error.message,
      friendlyMessage: 'Error al obtener data'
    };
    return ErrorObservable.create(dataError);
  }



  getItems(lista: string): Observable<any> {
    // tslint:disable-next-line:prefer-const
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json;odata=verbose' });
    // tslint:disable-next-line:quotemark
    // tslint:disable-next-line:prefer-const
    let url = `/_api/web/lists/GetByTitle('${lista}')/items`;
    return this._http.get<any[]>(url, { headers });
  }

}
