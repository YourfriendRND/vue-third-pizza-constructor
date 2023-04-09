
<template>
    <li class="cart-list__item">
        <div class="product cart-list__product">
            <img :src="getImage('product.svg')" class="product__img" width="56" height="56" :alt="order.name">
            <div class="product__text">
                <h2>{{ order.name }}</h2>
                <ul>
                    <li>{{ order.size.name }}, на {{ order.dough.value === 'large' ? 'толстом' : 'тонком'}} тесте</li>
                    <li>Соус: {{ order.sauce.name }}</li>
                    <li>Начинка: {{ getFillingsText(order.ingredients) }}</li>
                </ul>
            </div>
        </div>
        <app-counter 
            class="counter cart-list__counter" 
            :isOrange="true" 
            :modelValue="orderCounter.value"
            v-model="orderCounter.value"
        />

        <div class="cart-list__price">
            <b>{{ order.price }}</b>
        </div>

        <div class="cart-list__button">
            <button type="button" class="cart-list__edit">Изменить</button>
        </div>
    </li>
</template>

<script setup>
import { getImage } from '@/common/helpers/normalize';
import { defineProps, reactive } from 'vue';
import AppCounter from '@/common/components/AppCounter.vue'
import { useDataStore } from '@/store/data';
import { useCartStore } from '@/store/cart';

const dataStore = useDataStore();
const cartStore = useCartStore();

const props = defineProps({
    order: {
        type: Object,
        default: () => {}
    }
});

const convertIngredients = (ingredients) => {
    console.log(ingredients)
    return ingredients.map((ingredient) => {
        const targetIngredient = dataStore.ingredients.find((ing) => {
            return ing.value === ingredient;
        });
        return targetIngredient.name;
    }).reduce((acc, filling) => {
        if (acc[filling]) {
            acc[filling] = acc[filling] + 1;
            return acc;
        }
        acc[filling] = 1;
        return acc;
    }, {});
};

const getFillingsText = (ingredients) => {
    const filling = convertIngredients(ingredients);
    console.log(filling)
    return Object.keys(filling).map((item) => {
        if (filling[item] > 1) {
            return `${item} x${filling[item]}`;
        }
        return item; 
    }).join(', ')
}

const orderCounter = reactive({
    value: cartStore.pizzas.filter((pizza) => pizza.index === props.order.index).length,
});

</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/ds-system/ds.scss';

.product {
    display: flex;
    align-items: center;
}

.product__text {
    margin-left: 15px;

    h2 {
        @include b-s18-h21;

        margin-top: 0;
        margin-bottom: 10px;
    }

    ul {
        @include clear-list;
        @include l-s11-h13;
    }
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
