
<template>
    <li class="cart-list__item">
        <div class="product cart-list__product">
            <img :src="getImage('product.svg')" class="product__img" width="56" height="56" :alt="order.name">
            <product-text :pizza="order" />
        </div>
        <app-counter 
            class="counter cart-list__counter" 
            :isOrange="true" 
            :modelValue="orderCounter.pizza.count"
            v-model="orderCounter.pizza.count"
        />

        <div class="cart-list__price">
            <b>{{ order.price }}</b>
        </div>

        <div class="cart-list__button">
            <button 
                type="button" 
                class="cart-list__edit" 
                @click="changePizzaOrder"
            >
                Изменить
            </button>
        </div>
    </li>
</template>

<script setup>
import { getImage } from '@/common/helpers/normalize';
import { defineProps, reactive, watch } from 'vue';
import AppCounter from '@/common/components/AppCounter.vue'
import ProductText from '@/common/components/ProductText.vue';
import { useCartStore } from '@/store/cart';
import { usePizzaStore } from '@/store/pizza';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const router = useRouter();

const props = defineProps({
    order: {
        type: Object,
        default: () => {}
    }
});

const changePizzaOrder = () => {
    pizzaStore.setPizza({
        index: props.order.index,
        name: props.order.name,
        sauceId: props.order.sauce.id,
        doughId: props.order.dough.id,
        sizeId: props.order.size.id,
        ingredients: props.order.ingredients,
        price: props.order.price,
    })
    router.push({name: 'home'});
};

const orderCounter = reactive({
    pizza: {
        index: props.order.index,
        count: props.order.count,
    },
});

watch(orderCounter.pizza, () => {
    cartStore.updatePizza({...orderCounter.pizza});
});

</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/ds-system/ds.scss';

.product {
    display: flex;
    align-items: center;
}

.cart-list__item {
    display: flex;
    align-items: flex-start;

    margin-bottom: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-left: 15px;

    border-bottom: 1px solid rgba($green-500, 0.1);

    &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;

        border-bottom: none;
    }
}

.cart-list__product {
    flex-grow: 1;

    margin-right: auto;
}

.cart-list__counter {
    width: 54px;
    margin-right: auto;
    margin-left: 20px;
}

.cart-list__price {
    min-width: 100px;
    margin-right: 36px;
    margin-left: 10px;

    text-align: right;

    b {
        @include b-s16-h19;
    }
}

.cart-list__edit {
    @include l-s11-h13;

    cursor: pointer;
    transition: 0.3s;

    border: none;
    outline: none;
    background-color: transparent;

    &:hover {
        color: $green-500;
    }

    &:active {
        color: $green-600;
    }

    &:focus {
        color: $green-400;
    }
}
</style>
