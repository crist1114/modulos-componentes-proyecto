import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total=0;
  @Input() products: Product[] = []
  // @Input() productId: string | null = null;
  @Input()
  set productId(id:string | null){
    if(id){
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  showProductDetail = false;
  productChosen :Product ={
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    }
  }

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  today = new Date();
  date = new Date(2021,1,21)

  constructor(private storeService : StoreService, private productsService: ProductsService ) {

    this.myShoppingCart = this.storeService.getShoppingCart();
   }



  addToShoppingCart(product : Product){
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id :string){
    this.statusDetail='loading'
    if(!this.showProductDetail){
        this.showProductDetail = true;
    }
    this.productsService.getProduct(id)
    .subscribe(data => {

      this.productChosen = data;
      this.statusDetail = 'success'
    }, errorMsg=>{
      window.alert(errorMsg)
      this.statusDetail = 'error'
    })
  }
//callback hell
  readAndUpdate(id: string){

    this.productsService.getProduct(id)
    .pipe(
      switchMap(product =>
        this.productsService.update(product.id, {title: 'change'}) //dependo de getProduct
      )
    )
    .subscribe( data =>{
        console.log(data);
      }
    );
    //asi hago dos peticiones a la vez
    this.productsService.fetchReadAndUpdate(id, {title : 'nuevo'})
    .subscribe(response => {
      const read = response[0];
      const updte = response[1];
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'nuevo',
      description: 'esta es la description',
      categoryId: 2,
      images: ['https://placeimg.com/640/480/any'],
      price: 23244
    }
    this.productsService.create(product)
    .subscribe(data =>{
      this.products.unshift(data);
    });
  }

  updateProduct(){

    const changes : UpdateProductDTO = {
      title: 'nuevo titulo',
    }
    const id = this.productChosen.id;

    this.productsService.update(id, changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    });
  }

  onLoadMore(){
    this.loadMore.emit();
  }

}
