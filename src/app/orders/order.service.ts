import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/orders';

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl);
  }
}
