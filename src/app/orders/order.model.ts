export interface Order {
  id: string;
  customerName: string;
  status: 'pending' | 'shipped' | 'delivered';
  notes: string;
  total: number;
  createdAt: string;
}
