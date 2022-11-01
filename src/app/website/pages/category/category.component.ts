import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = []

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    //el nombre del parametro q recibo debe coincidei con el que puse el el routing
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.productsService
          .getByCategory(this.categoryId, this.limit, this.offset)
        }
        return []
      })
      //podria seguir concatenando mas swithcMap
      // ,
      // switchMap(params => {
      //   this.categoryId = params.get('id');
      //   if (this.categoryId) {
      //     return this.productsService
      //     .getByCategory(this.categoryId, this.limit, this.offset)
      //   }
      //   return []
      // })
    )
      .subscribe(data => {
              this.products = data
        })
  }
  
  onLoadMore(){
    this.productsService.getPoductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }

}
