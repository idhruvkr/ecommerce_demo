import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { CartService } from '../../_services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal!: number;
  
  constructor(
    private cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cart.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cart.removeCartItem(item);
  }

  emptycart() {
    this.cart.removeAllCart();
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
