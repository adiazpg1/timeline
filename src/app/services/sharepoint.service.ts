import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticias } from '../interfaces/noticias';
import 'rxJs/Rx';
import { Months } from '../interfaces/months';



@Injectable()
export class SharepointService {


  url = '../data/data.json';

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
  }];

  constructor(private _http: HttpClient) {
  }


  getData() {
    // tslint:disable-next-line:whitespace
    return this._http.get(this.url);
  }


}
