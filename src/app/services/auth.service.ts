import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  constructor(private http : HttpClient, private tokenService: TokenService) { }

  login(email:string, password :string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token)
      })
      // ,
      // switchMap(()=>{
      //   return this.profile();
      // })
    );
  }

  logout(){
    this.tokenService.removeToken();
  }

  profile(){
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // Comentamos esto por que no es necesario enviar el token cuando usamos interceptores
      // headers:{
      //   Authorization: `Bearer ${token}`,
      //   // 'Content-type': 'application/json'
      // }
    }).pipe(


      tap(user => this.user.next(user))
      
    )
  }
}
