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
  templateUrl: './category-product-admin.component.html',
  styleUrls: ['./category-product-admin.component.css']
})
export class CategoryProductsComponentAdmin implements OnInit {
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

  editProduct(product: Product): void {
    this.router.navigate(['/product/form', product.id]);
  }

  deleteProduct(product: Product, event: Event): void {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete the product "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.successMessage = `Product "${product.name}" has been deleted successfully!`;
          setTimeout(() => this.successMessage = '', 2000);
        },
        error => console.error('Failed to delete product:', error)
      );
    }
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/product/form']);
  }

  navigateBackToCategories(): void {
    this.router.navigate(['/category/list/admin']); 
  }

  viewDetails(product: Product): void {
    this.router.navigate(['/product/detail/admin', product.id]);
  }
}
