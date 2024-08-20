import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdressService } from '../../service/adress.service'; 
import { Adress } from '../../models/adress.model'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adress-form',
  standalone: true,
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AdressFormComponent implements OnInit {
  isEditMode = false;
  adressForm!: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adressService: AdressService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.adressForm = this.fb.group({
      id: [0],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.adressService.get(id).subscribe({
          next: (adress) => this.adressForm.patchValue(adress),
          error: (err) => console.error('Error fetching adress', err)
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.adressService.update(this.adressForm.value).subscribe({
        next: () => {
          this.displaySuccessMessage('Address has been updated successfully!');
        },
        error: (err) => console.error('Error updating address', err)
      });
    } else {
      this.adressService.add(this.adressForm.value).subscribe({
        next: () => {
          this.displaySuccessMessage('Address has been added successfully!');
        },
        error: (err) => console.error('Error adding address', err)
      });
    }
  }

  onDelete(): void {
    const id = this.adressForm.get('id')?.value;
    if (id) {
      this.adressService.delete(id).subscribe({
        next: () => {
          this.displaySuccessMessage('Address deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting address', err);
        }
      });
    }
  }

  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/adress/list']);
    }, 2000);
  }
}
