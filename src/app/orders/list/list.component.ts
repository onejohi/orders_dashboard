import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PaginatorComponent, RouterModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private orderService = inject(OrderService);
  orders = signal<Order[]>([]);
  search = signal('');
  status = signal('');
  sort = signal<'total' | 'createdAt'>('createdAt');
  sortDir = signal<'asc' | 'desc'>('desc');
  currentPage = signal(1);
  readonly pageSize = 5;

  totalOrders = this.orderService.totalOrders;

  constructor() {
    effect(() => {
      this.fetchOrders();
    });
  }

  fetchOrders() {
    const params: any = {
      _page: this.currentPage(),
      _limit: this.pageSize,
      _sort: this.sort(),
      _order: this.sortDir(),
      customerName: this.search(),
    };

    console.log('Search:', this.search())

    if (this.status()) {
      params.status = this.status();
    }

    this.orderService.getOrders(params).subscribe({
      next: (data) => {
        const totalCount = Number(data.headers.get('x-total-count')) || 0;
        this.totalOrders.set(totalCount);
        this.orders.set(data.body ?? []);
      },
      error: (err) => console.error('Failed to load orders', err),
    });
  }

  onSearchChange() {
    this.currentPage.set(1);
  }

  onStatusChange() {
    this.currentPage.set(1);
  }

  changeSort(field: 'total' | 'createdAt') {
    if (this.sort() === field) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sort.set(field);
      this.sortDir.set('asc');
    }
  }

  nextPage() {
    if (this.currentPage() * this.pageSize < this.totalOrders()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
