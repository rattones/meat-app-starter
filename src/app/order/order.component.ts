import { Component, OnInit } from '@angular/core';

import { RadioOption } from '../shared/radio/radio-option.model'
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItems } from './order.model'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débido', value: 'DEB'},
    {label: 'Vale Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue() :number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increasyQty(item: CartItem) {
    this.orderService.increasyQty(item)
  }

  decreasyQty(item: CartItem) {
    this.orderService.decreasyQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems= this.cartItems()
      .map((item:CartItem)=>new OrderItems(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe(
        (orderId: string)=> {
          console.log(`Compra concluída ${orderId}`)
          this.orderService.clear()
        }
      )
    console.log(order)
  }

}
