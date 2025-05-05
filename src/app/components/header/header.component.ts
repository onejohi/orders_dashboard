import { Component, inject, computed } from '@angular/core';
import { UiService } from '../../core/ui.service';
import { OrderService } from '../../orders/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private ui = inject(UiService);
  private orderService = inject(OrderService);

  totalOrders = computed(() => this.orderService.totalOrders());

  toggleDialog() {
    this.ui.toggleDialog();
  }

  toggleTheme() {
    const newTheme = this.ui.theme() === 'light' ? 'dark' : 'light';
    this.ui.theme.set(newTheme);
  }
}
