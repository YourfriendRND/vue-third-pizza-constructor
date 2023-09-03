export const DATA_TRANSFER_PAYLOAD = 'payload';

export const CounterTypes = {
    DecrementType: 'minus',
    IncrementType: 'plus' 
};

export const CounterValue = {
    DecrementValue: 'Меньше',
    IncrementValue: 'Больше',
}

export const DeliveryTypes = {
    Self: 'self',
    New: 'new',
    Address: 'address'
};

export const ApplicationViews = {
    login: 'login',
    cart: 'cart',
    orders: 'orders',
    home: 'home'
}

export const DefaultDeliveryCases = [
    {
        id: -1,
        name: "Заберу сам",
        type: DeliveryTypes.Self
    },
    {
        id: 0,
        name: 'Новый адрес',
        type: DeliveryTypes.New
    }
]
