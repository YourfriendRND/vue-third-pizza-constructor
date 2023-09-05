<template>
    <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
            <li>{{ pizza.size.name }}, на {{ pizza.dough.value === 'large' ? 'толстом' : 'тонком'}} тесте</li>
            <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
            <li>Начинка: {{ getFillingsText(pizza.ingredients) }}</li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useDataStore } from '@/store/data';

const dataStore = useDataStore();

const props = defineProps({
    pizza: {
        type: Object,
        default: () => {}
    }
});

const convertIngredients = (pizzaIngredients) => {
    return pizzaIngredients.map((ingredient) => {
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

const getFillingsText = (pizzaIngredients) => {
    const filling = convertIngredients(pizzaIngredients);
    return Object.keys(filling).map((item) => {
        if (filling[item] > 1) {
            return `${item} x${filling[item]}`.toLowerCase();
        }
        return item.toLowerCase(); 
    }).join(', ')
}

</script>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";
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

</style>