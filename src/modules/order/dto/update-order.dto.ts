import { OrderStatus } from "../enums";

export class UpdateOrderDto {
  status?: OrderStatus;
  total_price?: number;
}
