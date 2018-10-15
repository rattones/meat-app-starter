class Order {
    constructor(
        public address: string,
        public nember: string, 
        public optional: string,
        public paymentOptions: string,
        public orderItems: OrderItems[]    
    ) {}
}

class OrderItems {
    constructor(public quantity: number, public menuId: string) {}
}

export { Order, OrderItems }