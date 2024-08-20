import { Component, OnInit } from '@angular/core';
import { AdressService } from '../../service/adress.service'; 
import { Adress } from '../../models/adress.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-adress-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adress-list.component.html',
  styleUrls: ['./adress-list.component.css']
})
export class AdressListComponent implements OnInit {
  adresses: Adress[] = [];

  constructor(private adressService: AdressService) {}

  ngOnInit(): void {
    this.adressService.getAll().subscribe((data: Adress[]) => {
      this.adresses = data;
    }, error => {
      console.error('Erreur lors du chargement des adresses', error);
    });
  }
}
