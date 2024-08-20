import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductFormComponent implements OnInit {
  isEditMode = false;
  productForm!: FormGroup;
  categories: any;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [0],
      reference: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      availableQuantity: [0, Validators.required],
      price: [0, Validators.required],
      imageProduct: [''],
      category: [null, Validators.required]
    });

    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.productService.getProductById(id).subscribe({
          next: (product: Product) => this.productForm.patchValue(product),
          error: (err: any) => console.error('Error fetching product', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productForm.value).subscribe({
        next: () => {
          this.displaySuccessMessage('Product has been updated successfully!');
        },
        error: (err: any) => console.error('Error updating product', err)
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: () => {
          this.displaySuccessMessage('Product has been added successfully!');
        },
        error: (err: any) => console.error('Error adding product', err)
      });
    }
  }
  
  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/product/list/admin']);
    }, 2500);
  }


  onDelete(): void {
    const id = this.productForm.get('id')?.value;
    if (id) {
        this.productService.deleteProduct(id).subscribe({
            next: () => this.displaySuccessMessage('Product deleted successfully!'),
            error: (err: any) => {
                console.error('Error deleting product', err);
                // Optionally, you can display an error message to the user here
            }
        });
    }
}
}
