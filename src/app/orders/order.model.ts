export interface Order {
  id: number;
  customerName: string;
  status: 'pending' | 'shipped' | 'delivered';
  notes: string;
  total: number;
  createdAt: string;
}
