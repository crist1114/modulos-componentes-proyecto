import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = ''
  imgParent = '';
  showImg = true;
  imgRta = '';

  constructor(private authService : AuthService, private userService: UsersService,
    private fileService: FilesService,
    private tokenService : TokenService){}
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.profile()
      .subscribe();
    }
  }

  onLoaded(img : string){
    console.log("log padre", img)
  }

  toogleImg(){
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name: 'sebas',
      email: 'seb@gmail.com',
      password: '1234',
      role: 'customer'
    })
    .subscribe(data => {
      console.log(data);

    })
  }

  downloadDPF(){
    //recibe nombre con el que quiero descargar, ubicacion, tipo
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
          .subscribe(rta => {
            this.imgRta = rta.location;
          });

    }

  }

}
