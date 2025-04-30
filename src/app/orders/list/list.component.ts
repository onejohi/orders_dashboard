import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  search = '';

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => (this.orders = data));
  }
}
