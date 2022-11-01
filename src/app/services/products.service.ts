import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError,zip } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment'
import { checkTime } from '../interceptors/time.interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;

  constructor(private httpClient : HttpClient) { }

  getByCategory(categoryId: string, limit?:number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.httpClient.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
  }

  getAllProducts(limit?: number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    } /**
      Para usar un interceptor en una peticion en especifico
      le pasamos el checkTime que construimos en el interceptor
    */
      return this.httpClient.get<Product[]>(`${this.apiUrl}/products`, {params, context: checkTime()})
      .pipe(
        retry(3),  //si no se logra obtener respuesta reintenta
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }

  getPoductsByPage(limit:number, offset:number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`,{
      params: {limit, offset}
    })
    .pipe(
      retry(3),  //si no se logra obtener respuesta reintenta
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id:string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id :string){
    return this.httpClient.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 500){
          return throwError('Algo esta fallando en el server')
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe')
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas permitido para ingresar aca')
        }
        return throwError('Ups algo salio mal')
      })
    )
  }

  create(product : CreateProductDTO){
    return this.httpClient.post<Product>(`${this.apiUrl}/products`, product);
  }

  update(id: string, product : UpdateProductDTO){
    return this.httpClient.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  delete(id: string){
    return this.httpClient.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
