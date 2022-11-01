import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExitGuard, OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }
  
  OnExit (){
    const rta =  confirm('Logica desde comp, estas seguro salir?');
    return rta;
  }

}
