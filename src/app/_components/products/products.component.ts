import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../_services/api/api.service';
import { CartService } from '../../_services/cart/cart.service';

import { FilterPipe } from '../../_shared/filter.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  searchKey: string = '';

  constructor(
    private api: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
