import { Component, OnInit } from '@angular/core';
import { SharepointService } from '../../services/sharepoint.service';
import { Noticias } from '../../interfaces/noticias';
import { Subscription } from 'rxjs/Subscription';
import { Months } from '../../interfaces/months';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  _MESES: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Noviembre',
    'Diciembre'
  ];
  data: Noticias[] = [];
  dateToday: Date = new Date();
  mesSelected: Months;
  daysLine: any[] = [];

  constructor(private _sharepointService: SharepointService) {
    this._sharepointService.getData().subscribe(
      (param: any) => {
        this.data = param.filter(x => {
          // tslint:disable-next-line:prefer-const
          let date = new Date(x.date);
          return date.getMonth() === this.dateToday.getMonth() && date.getFullYear() === this.dateToday.getFullYear();
        });
        console.log(this.data);
      }, error => {
        console.log('Error in get Data' + error);
      }
    );

    this.mesSelected = this._sharepointService.meses[this.dateToday.getMonth()];
    console.log(this.mesSelected);
  }

  ngOnInit() {


    this.drawLine();

  }


  drawLine() {
    // crear lista del mes con todos los dias
    // array ID = day - 1
    for (let i = 1; i <= this.mesSelected.days; i++) {
      let item = {
        'day': i,
        'shortName': `${i}-${this.mesSelected.shortNameMonth}.`,
        'notices': []
      };
      this.daysLine.push(item);
    }

    // for (let j = 0; j <= this.data.length; j++) {
    //   let date = new Date(this.data[j].date).getDate();
    //   console.log(this.daysLine[date - 1]);
    // }
    console.log(this.data[1].date.toString());

    // agregarle las noticias a ese dia del mes??
  }


}
