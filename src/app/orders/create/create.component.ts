import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';
import { UiService } from '../../core/ui.service';
import { Order } from '../order.model';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'create-order',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private ui = inject(UiService);

  dialogOpen = this.ui.dialogOpen;

  orderForm: FormGroup = this.fb.group({
    customerName: ['', Validators.required],
    total: [null, [Validators.required, Validators.min(1)]],
    status: ['pending', Validators.required],
    notes: [''],
    createdAt: [new Date(), Validators.required],
  });

  toggleDialog() {
    this.ui.toggleDialog();
  }

  saveOrder() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.orderService.createOrder(this.orderForm.value).subscribe({
      next: () => {
        this.ui.toggleDialog();
        this.orderForm.reset();
        this.orderService.triggerRefresh();
      },
      error: (err) => console.error('Order creation failed', err),
    });
  }
}
