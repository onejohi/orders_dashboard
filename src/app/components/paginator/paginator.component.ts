import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() pageSize = 10;

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
