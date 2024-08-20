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
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
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

  addToCart(product: Product): void {
    this.cartPageService.addProductToCart(product);
    this.successMessage = `Your product "${product.name}" has been added to your cart!`;
    setTimeout(() => this.successMessage = '', 2000);
  }

  navigateToProductList(): void {
    this.router.navigate(['/product/list']);
  }
}
