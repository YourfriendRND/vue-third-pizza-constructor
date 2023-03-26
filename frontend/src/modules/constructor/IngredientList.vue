<template>
    <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
            
            <li class="ingredients__item" v-for="ingredient in items" :key="ingredient.id">
                <app-drag :draggable="true" :dataTransfer="ingredient">
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
                <app-counter-two 
                    class="counter--orange ingredients__counter" 
                    v-model="ingredientListCounter[ingredient.value].counter" 
                    @click="emit('update:modelValue', ingredientListCounter)"
                />

                <!-- <div class="counter counter--orange ingredients__counter">
                    <app-counter 
                        :counterType="CounterTypes.DecrementType"
                        :counterText="CounterValue.DecrementValue"
                        @click="decreaseCounter(ingredient.value)"
                    />
                    {{ counter[ingredient.value].counter }}
                    <app-counter 
                        :counterType="CounterTypes.IncrementType"
                        :counterText="CounterValue.IncrementValue"
                        @click="increaseCounter(ingredient.value)"
                    />
                </div>         -->
            </li>
        </ul>

    </div>
</template>

<script setup>
    import AppCounter from '@/common/components/AppCounter.vue';
    import { CounterTypes, CounterValue } from '@/common/constants/index';
    
    import AppCounterTwo from '../../common/components/AppCounterTwo.vue';
    import AppDrag from '@/common/components/AppDrag.vue';
    import { getImage } from '@/common/helpers/normalize';
    import { reactive, defineProps } from "vue";
 
    const props = defineProps({
        modelValue: {
            type: Object,
            default: () => {},
        },
        items: {
            type: Array,
            default: () => [],
        },
        counter: {
            type: Object,
            default: {}
        }
    })
   
    const ingredientListCounter = reactive({...props.counter});

    const ingredientList = reactive({
        ingredients: [],
        setIngredients (ingredients) {
            this.ingredients = ingredients;
        },
    });

    const emit = defineEmits(['update:modelValue', 'counter']);

    const increaseCounter = (ingredient) => {
        ingredientListCounter[ingredient].counter = ingredientListCounter[ingredient].counter + 1;
        const ingredientListRow = [...ingredientList.ingredients, ingredient];
        ingredientList.setIngredients(ingredientListRow);
        emit('update:modelValue', ingredientList.ingredients)
    };

    const decreaseCounter = (ingredient) => {
        ingredientListCounter[ingredient].counter = ingredientListCounter[ingredient].counter> 0 
            ? ingredientListCounter[ingredient].counter - 1 
            : 0;  
        const targetIndex = ingredientList.ingredients.lastIndexOf((ingredient));
        const ingredientListRow = targetIndex !== -1 
            ? [...ingredientList.ingredients.slice(0, targetIndex), ...ingredientList.ingredients.slice(targetIndex + 1)]
            : ingredientList.ingredients;
        ingredientList.setIngredients(ingredientListRow);
        emit('update:modelValue', ingredientList.ingredients)
    };

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
