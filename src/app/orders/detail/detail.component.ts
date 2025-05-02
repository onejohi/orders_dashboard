import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  order?: Order;
  id?: String;
  editOrder!: Order;
  isEditing = false;
  constructor(private orderService: OrderService) {}

  startEditing(): void {
    this.isEditing = true;
  }

  saveOrder() {
    if (!this.order?.id) return;

    this.orderService.updateOrder(this.order.id, this.editOrder).subscribe({
      next: (updated) => {
        this.order = updated;
        this.isEditing = false;
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  ngOnInit() {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.orderService.getOrder(this.id).subscribe({
        next: (data) => (this.order = data),
        error: (err) => console.error('Order fetch failed', err)
      });
    }
  }

  deleteOrder() {
    if(!confirm('Are you sure you want to delete this order?')) {
      return;
    }
    if (this.id !== undefined) {
      this.orderService
        .deleteOrder(this.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/orders']);
          },
          error: (err) => {
            alert('Failed to delete order.');
          },
        });
    } else {
      console.error('Order ID is undefined. Cannot delete order.');
    }
  }
}
