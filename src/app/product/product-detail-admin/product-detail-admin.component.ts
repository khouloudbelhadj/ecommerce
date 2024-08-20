import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartPageService } from '../../service/cart-page.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-admin.component.html',
  styleUrls: ['./product-detail-admin.component.css']
})
export class ProductDetailComponentAdmin implements OnInit {
  product: Product = {
    id: 0,
    reference: '',
    name: '',
    description: '',
    availableQuantity: 0,
    price: 0,
    imageProduct: '',
    category: null,
  };
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartPageService: CartPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (product: Product) => this.product = product,
        error: (err) => console.error('Failed to fetch product:', err)
      });
    }
  }

  editProduct(product: Product): void {
    this.router.navigate(['/product/form', product.id]);
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.successMessage = `Product "${product.name}" has been deleted.`;
        setTimeout(() => this.successMessage = '', 2000);
        this.router.navigate(['/product/list/admin']);
      },
      error: (err) => console.error('Failed to delete product:', err)
    });
  }

  navigateToProductList(): void {
    this.router.navigate(['/product/list/admin']);
  }
}
