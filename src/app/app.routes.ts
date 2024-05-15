import { Routes } from '@angular/router';
import { CartComponent } from './_components/cart/cart.component';
import { ProductsComponent } from './_components/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
];
