import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticias } from '../interfaces/noticias';
import 'rxJs/Rx';
import { Months } from '../interfaces/months';



@Injectable()
export class SharepointService {


  url = '../data/data.txt';

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

  getData() {
    // tslint:disable-next-line:whitespace
    return this._http.get(this.url);
  }


  getItems(lista: string) {
    // tslint:disable-next-line:prefer-const
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json;odata=verbose' });
    // tslint:disable-next-line:quotemark
    // tslint:disable-next-line:prefer-const
    let url = `/_api/web/lists/GetByTitle('${lista}')/items`;
    return this._http.get(url, { headers });
  }

}
