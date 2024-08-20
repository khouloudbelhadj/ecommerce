import { Component, OnInit } from '@angular/core';
import { OrderLineService } from '../../service/order-line.service'; 
import { OrderLine } from '../../models/orderLine.model'; 
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-order-line-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-line-list.component.html',
  styleUrls: ['./order-line-list.component.css']
})
export class OrderLineListComponent implements OnInit {
  orderLines: OrderLine[] = [];

  constructor(private orderLineService: OrderLineService) {}

  ngOnInit(): void {
    this.orderLineService.getAll().subscribe((data: OrderLine[]) => {
      this.orderLines = data;
    });
  }
}
