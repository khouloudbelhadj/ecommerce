import { OrderLine } from './orderLine.model';
import { User } from './user.model';

export interface Cart {
  id: number;
  user: User;
  orderLines: Set<OrderLine>;
}
