import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { CartService } from '../../_services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  public searchTerm!: string;
  
  constructor(
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cart.search.next(this.searchTerm);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
