import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from "../../components/paginator/paginator.component";

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, PaginatorComponent, RouterModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  search = '';

  constructor() {
    this.loadOrders();
  }

  refreshEffect = effect(() => {
    this.orderService.refreshOrders();
    this.loadOrders();
  });

  loadOrders() {
    this.orderService.getOrders().subscribe((data) => (this.orders = data));
  }
}
