import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/orders';

  readonly refreshOrders = signal(0);
  readonly totalOrders = signal(0);


  getOrders(params: any): Observable<HttpResponse<Order[]>> {
    return this.http.get<Order[]>(this.baseUrl, {
      params,
      observe: 'response' // 👈 this includes headers
    });
  }

  getOrder(id: String): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  updateOrder(id: String, update: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}`, update);
  }

  deleteOrder(id: String): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  triggerRefresh() {
    this.refreshOrders.update((v) => v + 1);
  }
}
