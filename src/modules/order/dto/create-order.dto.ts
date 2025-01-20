import { OrderStatus } from "../enums";

export class CreateOrderDto {
  user_id: number;
  address_id: number;
  status: OrderStatus;
  total_price: number;
}
