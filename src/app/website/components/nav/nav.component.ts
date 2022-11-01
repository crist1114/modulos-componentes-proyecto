import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = []

  constructor(private storeService: StoreService, private authService: AuthService,
    private categoryService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
    this.getAllCategories();

  }

  login() {
    // this.authService.login('seb@gmail.com', '1234') //admin
    this.authService.login('john@mail.com', 'changeme') //customer
      .subscribe(rta => {

        this.router.navigate(['/profile']);
        this.authService.user$
        .subscribe(data => {
          console.log(data)
          this.profile = data;
        })
      })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  getProfile() {
    this.authService.profile()
      .subscribe(user => {
        this.profile = user;
      })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoryService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

}
