import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { StatusClassPipe } from '../../status-class.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, StatusClassPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  order?: Order;
  id?: String;
  editOrder!: Order;
  isEditing = false;
  saving = signal(false);
  constructor(private orderService: OrderService) {}

  orderForm: FormGroup = this.fb.group({
    customerName: ['', Validators.required],
    status: ['', Validators.required],
    notes: [''],
  });

  startEditing(): void {
    this.isEditing = true;
  }

  saveOrder() {
    if (!this.order?.id) return;
    this.saving.set(true)

    this.orderService.updateOrder(this.order.id, this.orderForm.value).subscribe({
      next: (updated) => {
        this.order = updated;
        this.isEditing = false;
        this.saving.set(false)
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  ngOnInit() {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.orderService.getOrder(this.id).subscribe({
        next: (data) => {
          this.order = data
          if (this.order) {
            this.orderForm.patchValue({
              customerName: this.order.customerName,
              status: this.order.status,
              notes: this.order.notes
            });
          }
        },
        error: (err) => console.error('Order fetch failed', err)
      });
    }
  }

  deleteOrder() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (this.id !== undefined && result.isConfirmed) {
        this.orderService
          .deleteOrder(this.id)
          .subscribe({
            next: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success"
              });
              this.router.navigate(['/']);
            },
            error: (err) => {
              alert('Failed to delete order.');
            },
          });
      } else {
        console.error('Order ID is undefined. Cannot delete order.');
      }
    });
  }
}
