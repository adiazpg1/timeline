import { Component, OnInit, ElementRef, Renderer, Input } from '@angular/core';
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

  data: any = [];
  listaNoticias: Noticias[] = [];
  loading = false;

  dateToday: Date = new Date();
  mesSelected: Months;
  daysLine: any[] = [];
  itemSelected: number;
  contentSelected: boolean;
  currentPage: number;
  lista = 'NoticiasPrueba';


  constructor(private _sharepointService: SharepointService,
    private el: ElementRef,
    private renderer: Renderer) {

    this.currentPage = this.dateToday.getMonth();

    this.init(true);
    console.log('Mes Seleccionado: ' + this.mesSelected);
  }


  ngOnInit() {

  }


  init(flag: boolean) {
    // preguntar domnde estamos parados
    if (window.location.href.indexOf('localhost') === -1) {
      console.log('Estoy en sharepoint');
      // estoy en sharepoint
      this._sharepointService.getItems(this.lista)
        .subscribe((result: any) => {
          this.listaNoticias = [];
          let data = result.d.results;
          // arma el array de noticias
          for (let i = 0; i < data.length; i++) {
            if (data[i].Visible) {
              let item: Noticias = {
                title: data[i].Title,
                visible: data[i].Visible,
                date: new Date(data[i].Fecha),
                link: data[i].Link.Url
              };
              this.listaNoticias.push(item);
            }
          }
          console.log('Lista  de noticias');
          console.log(this.listaNoticias);

          this.getData(flag, this.listaNoticias);
        }, err => console.log(err));
    } else {
      // estoy en loclahost
      this._sharepointService.getData()
        .subscribe(
          (param: any) => {
            this.listaNoticias = param;
            console.log('Lista  de noticias');
            console.log(this.listaNoticias);
            this.getData(flag, this.listaNoticias);
          }, (err: any) => {
            console.log(err.friendlyMessage);
          }
        );
    }
  }

  getData(flag: boolean, data: Noticias[]) {
    if (flag) {
      console.log('Este es el primer llamado');
    } else {
      console.log('funcion del slide');
    }
    // filtra las noticias;
    this.data = data.filter(x => {
      // tslint:disable-next-line:prefer-const
      let date = new Date(x.date);
      if (flag) {
        return date.getMonth() === this.dateToday.getMonth() && date.getFullYear() === this.dateToday.getFullYear();
      } else {
        return date.getMonth() === this.currentPage && this.dateToday.getFullYear() === this.dateToday.getFullYear();
      }
    });

    if (flag) {
      this.mesSelected = this._sharepointService.meses[this.dateToday.getMonth()];
      if ((this.dateToday.getFullYear() % 4) === 0 && this.mesSelected.id === 1) {
        this.mesSelected.days = 29;
      }
    } else {
      this.mesSelected = this._sharepointService.meses[this.currentPage];
      if ((this.dateToday.getFullYear() % 4) === 0 && this.mesSelected.id === 1) {
        this.mesSelected.days = 29;
      }
    }

    if (flag) {
      this.loading = true;
    }

    this.drawLine();
  }

  mouseEnter(i) {
    this.itemSelected = i;
  }
  mouseLeave() {
    this.itemSelected = 0;
  }

  clickContent() {
    this.contentSelected = true;
  }

  drawLine() {
    // crear lista del mes con todos los dias
    // array ID = day - 1
    this.daysLine = [];
    console.log('dias del mes seleccionado: ' + this.mesSelected.days);

    for (let i = 1; i <= this.mesSelected.days; i++) {
      let item = {
        'day': i,
        'shortName': `${i}-${this.mesSelected.shortNameMonth}.`,
        'notices': []
      };
      this.daysLine.push(item);
    }
    for (let j = 0; j < this.data.length; j++) {
      let date = new Date(this.data[j].date).getDate();
      this.daysLine[date - 1].notices.push(this.data[j]);
    }


  }

  slide(e: Event, direction: Boolean) {
    console.log(this.currentPage);

    if (direction) {
      this.currentPage = this.currentPage + 1;
      console.log('Curret month: ' + this.currentPage);
      this.init(false);
    } else {
      this.currentPage = this.currentPage - 1;
      console.log('Curret month: ' + this.currentPage);
      this.init(false);
    }
  }

}
