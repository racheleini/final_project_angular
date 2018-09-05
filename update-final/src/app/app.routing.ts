import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AccountComponent } from './components/account/account.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuardCard } from './shared/authcart.guard';

const appRoutes: Routes = [
    {
        path: 'front-end-books-store/account', component: AccountComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: 'front-end-books-store/products', component: ProductsComponent, children: [
            { path: 'productpreview', component: ProductPreviewComponent }

        ]
    },
    {
        path: 'front-end-books-store/cart', component: CartComponent, canActivate: [AuthGuard]
    },
    {
        //can not move cartproduct without card full
        path: 'front-end-books-store/cartproduct', component: CartProductComponent ,canActivate: [AuthGuardCard]
    }
    ,
    {
        path: 'front-end-books-store/productdetails', component: ProductDetailsComponent
    }
    ,
    {
        path: 'front-end-books-store/home', redirectTo: 'front-end-books-store'
    },
    // default  main's level  redirect to home
    { path: 'front-end-books-store', component: HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
