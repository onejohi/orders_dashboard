import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusClass',
  standalone: true
})
export class StatusClassPipe implements PipeTransform {
  transform(status: string): string {
    switch (status?.toLowerCase()) {
      case 'cancelled':
        return 'bg-red-100 text-red-600 dark:bg-red-400 dark:text-white';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-400 dark:text-white';
      case 'processing':
        return 'bg-teal-100 text-teal-600 dark:bg-teal-400 dark:text-white';
      case 'shipped':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-400 dark:text-white';
      case 'delivered':
        return 'bg-green-100 text-green-600 dark:bg-green-400 dark:text-white';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-400 dark:text-white';
    }
  }
}
