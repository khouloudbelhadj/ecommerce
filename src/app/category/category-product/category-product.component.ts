import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';
import { CartPageService } from '../../service/cart-page.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductsComponent implements OnInit {
  products: (Product & { showDetails: boolean })[] = [];
  categoryId: number | null = null;
  categoryName: string = '';
  successMessage: string = '';  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartPageService: CartPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
      if (this.categoryId) {
        this.productService.getProductsByCategory(this.categoryId).subscribe(
          (data: Product[]) => {
            this.products = data.map(product => ({ ...product, showDetails: false }));
          },
          error => console.error('Erreur lors du chargement des produits', error)
        );
      }
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

  navigateBackToCategories(): void {
    this.router.navigate(['/category/list']); 
  }
}
