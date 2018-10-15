import { Injectable } from "@angular/core"

import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { Order, OrderItems } from './order.model'

import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service"
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model"

import { MEAT_API } from '../app.api'

@Injectable()

export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: Http) {}

    itemsValue(): number {
        return this.cartService.total();
    }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increasyQty(item: CartItem) {
        this.cartService.increasyQty(item)
    }

    decreasyQty(item: CartItem) {
        this.cartService.descreasyQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    checkOrder(order: Order): Observable<string> {
        const headers= new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`, 
                            JSON.stringify(order), 
                            new RequestOptions({headers: headers}))
                    .map(response=> response.json())
    }

    clear() {
        this.cartService.clear()
    }

}