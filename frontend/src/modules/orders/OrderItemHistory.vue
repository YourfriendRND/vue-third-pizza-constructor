<template>
    <section class="sheet order">
        <div class="order__wrapper">
            <div class="order__number">
                <b>Заказ #{{ props.orderHistoryData.id }}</b>
            </div>

            <div class="order__sum">
                <span>Сумма заказа: {{ props.orderHistoryData.price }} ₽</span>
            </div>

            <div class="order__button">
                <button 
                    type="button" 
                    class="button button--border" 
                    @click="orderStore.setActiveOrderId(props.orderHistoryData.id)"
                    >
                    Удалить
                </button>
            </div>
            <div class="order__button">
                <button 
                    type="button" 
                    class="button" 
                    @click="repeateOrderClickHandler"
                    >
                    Повторить
                </button>
            </div>
        </div>

        <ul class="order__list" v-for="pizza in props.orderHistoryData.pizzas">
            <li class="order__item">
                <div class="product">
                    <img src="@/assets/img/product.svg" class="product__img" width="56" height="56" :alt="pizza.name">
                    <product-text :pizza="pizza"/>
                </div>

                <p class="order__price">{{ (pizza.count > 1 ? `${pizza.count}x${pizza.price}` : pizza.price) }} ₽</p>
            </li>
        </ul>

        <additional-item-history :misc="props.orderHistoryData.misc.filter((item) => item.count)" />

        <p class="order__address">
            Адрес доставки: {{ getOrderContacts(props.orderHistoryData) }}
        </p>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/store/orders';
import { useCartStore } from '@/store/cart';
import { useProfileStore } from '@/store/profile';
import ProductText from '@/common/components/ProductText.vue';
import AdditionalItemHistory from '@/modules/orders/AdditionalItemHistory.vue';

const orderStore = useOrderStore();
const cartStore = useCartStore();
const profileStore = useProfileStore();
const router = useRouter();

const props = defineProps({
    orderHistoryData: {
        type: Object,
    },
});

const repeateOrderClickHandler = () => {
    cartStore.repeateOrder(props.orderHistoryData);
    router.push('/cart');
};

const getOrderContacts = (order) => {
    if (order.addressId > 0) {
        const targetAddress = profileStore.addresses.find((address) => address.id === order.addressId);
        const fullAdress = `${targetAddress.street}, д.${targetAddress.building}${targetAddress.flat ? ', кв.' + targetAddress.flat : ''}`;
        return `${fullAdress}, контактный телефон: ${order.clientPhone}`;
    }
    
    return `Самовывоз, контактный телефон: ${order.clientPhone}`;
   
};

</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

.order {
    margin-bottom: 32px;
    padding-top: 0;
}

.order__wrapper {
    display: flex;
    align-items: center;

    padding: 6px 16px;

    border-bottom: 1px solid rgba($green-500, 0.1);

    b {
        @include b-s14-h16;
    }

    span {
        @include b-s14-h16;
    }

    button {
        padding: 8px 26px;
    }
}

.order__number {
    margin-right: auto;
}

.order__sum {
    margin-right: 16px;
}

.order__button {
    margin-left: 16px;
}

.order__list {
    @include clear-list;

    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 24px;
    padding-right: 10px;
    padding-left: 10px;
}


.order__item {
    display: flex;
    width: 310px;
    margin-right: 33px;
    margin-bottom: 32px;
}

.order__price {
    @include b-s16-h19;

    margin: 0;
    white-space: nowrap;
}


.order__address {
    @include l-s11-h13;

    margin: 0;
    padding: 16px 10px;
    border-top: 1px solid rgba($green-500, 0.1);
}

.product {
    display: flex;
    align-items: center;
}

</style>