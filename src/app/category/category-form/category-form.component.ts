import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../service/category.service'; 
import { Category } from '../../models/category.model'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CategoryFormComponent implements OnInit {
  isEditMode = false;
  categoryForm!: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      imageCategory: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.categoryService.get(id).subscribe({
          next: (category) => this.categoryForm.patchValue(category),
          error: (err) => console.error('Error fetching category', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.categoryService.update(this.categoryForm.value).subscribe({
        next: () => {
          this.displaySuccessMessage('Category has been updated successfully!');
          }, 
          error: (err: any) => console.error('Error updating category', err)
        });  
    } else {
      this.categoryService.add(this.categoryForm.value).subscribe({
        next: () => {
          this.displaySuccessMessage('Category has been added successfully!');

        },
      error: (err: any) => console.error('Error adding category', err)
    });
  }
}


  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/category/list/admin']);
    }, 2000);
  }
  
  onDelete(): void {
    const id = this.categoryForm.get('id')?.value;
    if (id) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.displaySuccessMessage('Category deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting category', err);
          this.successMessage = ''; 
        }
      });
    }
  }

  }

 
