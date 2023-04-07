<template>
    <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <label v-for="sauce in dataStore.getSause" :key="sauce.id" class="radio ingredients__input">
            <input 
                type="radio" 
                name="sauce" 
                :value="sauce.value"
                :checked="sauce.value === pizzaStore.getActiveSauce.value"
                @input="pizzaStore.setSause(sauce.id)"
            >
            <span>{{ sauce.name }}</span>
        </label>
    </div>
</template>

<script setup>
import { useDataStore } from '@/store/data';
import { usePizzaStore } from '@/store/pizza';

const dataStore = useDataStore(); 
const pizzaStore = usePizzaStore();


</script>

<style scoped lang="scss">
    @import "@/assets/scss/common.scss";

    .ingredients__sauce {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 14px;
        p {
            @include r-s16-h19;
            margin-top: 0;
            margin-right: 16px;
            margin-bottom: 10px;
        }
    }
    
    .ingredients__input {
        margin-right: 24px;
        margin-bottom: 10px;
    }

</style>
