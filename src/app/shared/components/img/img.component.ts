import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img :string = ''

  @Input()
  set changeImg(newImg: string){
    this.img = newImg;
    //code
    console.log('change solo imagen => ', this.img);

  }
  @Input() alt :string = ''
  @Output() loaded = new EventEmitter<string>();

  imgDefault = './assets/images/default.jpg'
  counter =0;
  counterFn: number | undefined;

  constructor() {
    //antes de renderizar
    //puedo hacer cosas que NO sean asincronas
    console.log('constructor', 'imgValue =>', this.img);

  }
  ngOnDestroy(): void {
    //corre cuando se elimina el componente
    console.log('ngOnDestroy');
    window.clearInterval(this.counterFn);
  }
  ngAfterViewInit(): void {
    //corre despues de haber renderizado, podemos manipular elementos que ya se han cargado
    console.log('ngAfterViewInit');
  }
  ngOnChanges(changes: SimpleChanges): void {
    //corre antes del render su objetivo actualizar
    //cambios en los inputs, corre cada vez q se actualice
    console.log('onchanges', 'imgValue =>', this.img);
    console.log('changes ',changes);

  }

  ngOnInit(): void {
    // corre antes de renderizar y corre una sola vez
    // podemos hacer cosas asincronas, llamadas a api etc
    // console.log('onInit', 'imgValue =>', this.img);
    // this.counterFn= window.setInterval(()=>{
    //   this.counter++;
    //   console.log('run counter');

    // }, 1000)
  }

  imgError(){
      this.img = this.imgDefault
  }

  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
