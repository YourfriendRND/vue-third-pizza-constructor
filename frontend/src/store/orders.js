import uniqid from 'uniqid';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('orders', {
    
    state: () => ({
        activeOrderId: 0,
        isDeleteModalShow: false,
        previosOrders: [
            {
                id: 11199929,
                addressId: 1,
                clientPhone: '+79001210411',
                pizzas: [
                    {
                        name: 'Конская',
                        dough: {
                            name: "Тонкое",
                            value: "light"
                        },
                        sauce: {
                            name: "Сливочный"
                        },
                        size: {
                            name: "32 см"
                        },
                        ingredients: ["chile","ham", "ham", "onion","tomatoes"],
                        price: 2000,
                        count: 2,
                    }
                ],
                misc: [
                    {id:1,name:"Coca-Cola 0,5 литра",image:"cola",price:56,count:0},
                    {id:2,name:"Острый соус",image:"sauce",price:30,count:2},
                    {id:3,name:"Картошка из печи",image:"potato",price:56,count:3}
                ],
                price: 1_564
            },
        ]
    }),
    actions: {
        resetActiveOrder() {
            this.activeOrderId = 0;
            this.isDeleteModalShow = false;
        },

        deleteOrder() {
            this.previosOrders = this.previosOrders.filter((order) => order.id !== this.activeOrderId);
            this.resetActiveOrder();
        },

        setActiveOrderId(orderId) {
            this.activeOrderId = orderId;
            this.isDeleteModalShow = true;
        },

        addOrder(order) {
            this.previosOrders.push({
                id: uniqid(),
                ...order
            })
        },

    },
    getters: {}

})