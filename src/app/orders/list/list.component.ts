import { Component, effect, inject, signal, computed, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { UiService } from '../../core/ui.service';
import Swal from 'sweetalert2';
import { StatusClassPipe } from '../../status-class.pipe';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PaginatorComponent, RouterModule, StatusClassPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private orderService = inject(OrderService);
  private ui = inject(UiService);
  loading = signal(false);
  orders = signal<Order[]>([]);
  search = signal('');
  status = signal('');
  sort = signal<'total' | 'createdAt'>('createdAt');
  sortDir = signal<'asc' | 'desc'>('desc');
  currentPage = signal(1);
  readonly pageSize = 8;

  totalOrders = this.orderService.totalOrders;
  readonly refresh = inject(OrderService).refreshOrders;

  toggleDialog() {
    this.ui.toggleDialog();
  }

  constructor() {
    effect(() => {
      console.log('Refresh triggered');
      this.currentPage();
      this.fetchOrders();
    });
  }

  fetchOrders() {
    this.loading.set(true);
    const params: any = {
      page: this.currentPage(),
      limit: this.pageSize,
      customerName: this.search(),
    };

    if (this.status()) {
      params.status = this.status();
    }

    this.orderService.getOrders(params).subscribe({
      next: (data) => {
        this.orders.set(data.body ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load orders', err)
        this.loading.set(false);
      },
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
    if ((this.currentPage() >= this.totalOrders() && this.currentPage() === 1) || this.currentPage() >= this.totalOrders()) {
      Swal.fire({
        icon: 'info',
        title: 'No more pages to fetch',
        text: 'You have reached the last page.',
      });
      return;
    }
    this.currentPage.set(this.currentPage() + 1);
    this.fetchOrders();
  }

  prevPage() {
    if (this.currentPage() <= 1) {
      Swal.fire({
        icon: 'info',
        title: 'No previous page',
        text: 'You are already on the first page.',
      });
      return;
    }
    this.currentPage.set(this.currentPage() - 1);
  }
}
