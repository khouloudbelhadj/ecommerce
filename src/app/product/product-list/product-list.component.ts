import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';
import { CartPageService } from '../../service/cart-page.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: (Product & { showDetails: boolean })[] = [];
  filteredProducts: (Product & { showDetails: boolean })[] = [];
  successMessage: string = '';  
  searchQuery: string = '';
  isAscending: boolean = true;

  constructor(
    private productService: ProductService,
    private cartPageService: CartPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data.map(product => ({ ...product, showDetails: false }));
      this.filteredProducts = [...this.products];
    });
  }

  toggleDetailsVisibility(product: Product & { showDetails: boolean }): void {
    product.showDetails = !product.showDetails;
  }

  addToCart(product: Product): void {
    this.cartPageService.addProductToCart(product);
    this.successMessage = `Your product "${product.name}" has been added to your cart!`;  
    setTimeout(() => this.successMessage = '', 2000);  
  }

  viewDetails(product: Product): void {
    this.router.navigate(['/product/detail', product.id]);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart-page/cart-page-list']);
  }

  searchProducts(): void {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  toggleSortOrder(): void {
    this.isAscending = !this.isAscending;
    this.filteredProducts = this.filteredProducts.sort((a, b) => {
      if (a.name < b.name) return this.isAscending ? -1 : 1;
      if (a.name > b.name) return this.isAscending ? 1 : -1;
      return 0;
    });
  }
}
