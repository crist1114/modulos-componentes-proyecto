import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
          path: '',
          redirectTo: '/home',
          pathMatch: 'full'
        },
        {
        path: 'home',
        component:  HomeComponent
        },
        {
          path: 'category',
          loadChildren: ()=> import('./pages/category/category.module').then(m => m.CategoryModule),
          data: {
            preload: true,
          }
        },
        {
          path: 'not-found',
          component:  NotFoundComponent
        },
        {
          path: 'myCart',
          component:  MycartComponent
        },
        {
          path: 'login',
          component:  LoginComponent
        },
        {
          path: 'register',
          canDeactivate: [ExitGuard],
          component:  RegisterComponent
        },
        {
          path: 'profile',
          canActivate: [AuthGuard], //No permite el acceso
          component:  ProfileComponent
        },
        {
          path: 'recovery',
          component:  RecoveryComponent
        },
        {
          path: 'product/:id',
          component:  ProductDetailComponent
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
