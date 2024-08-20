import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery: string = '';
  isAscending: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      this.filteredCategories = data; // Initialize filtered categories
    }, error => {
      console.error('Erreur lors du chargement des categories', error);
    });
  }

  viewProducts(categoryId: number): void {
    this.router.navigate(['/category/category-product', categoryId]);
  }

  searchCategories(): void {
    let filtered = this.categories;
    if (this.searchQuery.trim()) {
      filtered = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.filteredCategories = this.sortCategories(filtered);
  }

  toggleSortOrder(): void {
    this.isAscending = !this.isAscending;
    this.filteredCategories = this.sortCategories(this.filteredCategories);
  }

  private sortCategories(categories: Category[]): Category[] {
    return categories.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.isAscending ? comparison : -comparison;
    });
  }
}
