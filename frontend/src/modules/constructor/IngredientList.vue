<template>
    <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
            
            <li class="ingredients__item" v-for="ingredient in dataStore.ingredients" :key="ingredient.id">
                <app-drag :draggable="true" :dataTransfer="{type: 'increase', payload: {
                    ingredient: ingredient.value
                }}">
                    <div :class="`filling filling--${ingredient.value}`">
                        <img
                            :src="getImage(ingredient.image)"
                            :alt="ingredient.name"
                            width="30"
                            height="30"
                        />
                        {{ ingredient.name }}
                    </div>
                </app-drag>
                <app-counter 
                    class="counter--orange ingredients__counter" 
                    :modelValue="pizzaStore.ingredients.filter((ing) => ing === ingredient.value).length"
                    v-model="ingredientList.counter[ingredient.value]"  
                />  
            </li>
        </ul>

    </div>
</template>

<script setup>
    import AppCounter from '../../common/components/AppCounter.vue';
    import AppDrag from '@/common/components/AppDrag.vue';
    import { getImage } from '@/common/helpers/normalize';
    import { reactive, watch } from "vue";
    import { useDataStore } from '@/store/data';
    import { usePizzaStore } from '@/store/pizza';

    const dataStore = useDataStore(); 
    const pizzaStore = usePizzaStore();
    
    const ingredientList = reactive({
        counter: pizzaStore.ingredientsCounter,
    });

    watch(ingredientList.counter, () => {
        Object.keys(ingredientList.counter).forEach((ingredientName) => {
            const storeIngredientCount = pizzaStore.ingredients.filter((ing) => ing === ingredientName).length;
            const localIgredientCount = ingredientList.counter[ingredientName];

            if (storeIngredientCount && localIgredientCount > storeIngredientCount) {
                pizzaStore.setIngredients({type: 'increase', payload: {
                    ingredient: ingredientName
                }})
            }

            if (storeIngredientCount && localIgredientCount < storeIngredientCount) {
                pizzaStore.setIngredients({type: 'decrease', payload: {
                    ingredient: ingredientName
                }})
            }

            if (!storeIngredientCount && localIgredientCount) {
                pizzaStore.setIngredients({type: 'increase', payload: {
                    ingredient: ingredientName
                }})
            }

        })

    })

</script>

<style scoped lang="scss">
    @import '@/assets/scss/ds-system/ds.scss';
    @import '@/assets/scss/mixins/mixins.scss';
    @import '@/assets/scss/visually-hidden.scss';
    .ingredients__filling {
        width: 100%;
        p {
            @include r-s16-h19;
            margin-top: 0;
            margin-bottom: 16px;
        }
    }

    .ingredients__list {
        @include clear-list;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .ingredients__item {
        width: 100px;
        min-height: 40px;
        margin-right: 17px;
        margin-bottom: 35px;
    }

    .ingredients__counter {
        width: 54px;
        margin-top: 10px;
        margin-left: 36px;
    }

    .filling {
        @include r-s14-h16;
        position: relative;
        display: block;
        padding-left: 36px;
        cursor: pointer;
        img {
            @include p_center-v;
            display: block;
            width: 32px;
            height: 32px;
            box-sizing: border-box;
            padding: 4px;
            border-radius: 50%;
        }
    }
    .counter {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>
