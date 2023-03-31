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
                <app-counter 
                    class="counter--orange ingredients__counter" 
                        :modelValue="ingredientList.counter[ingredient.value].counter"
                        v-model="ingredientList.counter[ingredient.value].counter"
                        @click="changeIngredientList(ingredient.value)"
                    />
                    
            </li>
        </ul>

    </div>
</template>

<script setup>
    import AppCounter from '../../common/components/AppCounter.vue';
    import AppDrag from '@/common/components/AppDrag.vue';
    import { getImage } from '@/common/helpers/normalize';
    import { reactive, defineProps } from "vue";
    
    const emit = defineEmits(['update:modelValue']);

    const props = defineProps({
        items: {
            type: Array,
            default: () => [],
        },
        modelValue: {
            type: Object,
            default: () => {},
            reactive: true,
        },
    })
   
    const ingredientList = reactive({
        counter: {...props.modelValue},
        totalIngredientCount: Object.keys(props.modelValue).reduce((prev, next) => {
                if (next === 'ingredients') {
                    return prev;
                }
                return prev + props.modelValue[next].counter;
            }, 0),
        setIngredientCount (count) {
            this.totalIngredientCount = count;
        },
        setIngredientList (ingredients) {
            this.counter.ingredients = ingredients;
        }
    })

    const getReducedIngredientList = (ingredient) => {
        const targetIndex = ingredientList.counter.ingredients.lastIndexOf((ingredient));
        const ingredientListRow = targetIndex !== -1 
            ? [...ingredientList.counter.ingredients.slice(0, targetIndex), ...ingredientList.counter.ingredients.slice(targetIndex + 1)]
            : [...ingredientList.counter.ingredients];
        return ingredientListRow;
    }

    const changeIngredientList = (ingredient) => {
        const prevTotalIngredintCount = ingredientList.totalIngredientCount;
        const currentIngredientCount = Object.keys(props.modelValue).reduce((prev, next) => {
            if (next === 'ingredients') {
                return prev;
            }
            return prev + ingredientList.counter[next].counter;
        }, 0)
        ingredientList.setIngredientCount(currentIngredientCount);
        if (ingredientList.counter.ingredients.length > currentIngredientCount) {
            const ingredientListRow = getReducedIngredientList(ingredient);
    
            ingredientList.setIngredientList(ingredientListRow)
            ingredientList.setIngredientCount(ingredientListRow.length)
            emit('update:modelValue', ingredientList.counter)
            return;
        }

        if (prevTotalIngredintCount < ingredientList.totalIngredientCount) {
            ingredientList.setIngredientList(
                [...ingredientList.counter.ingredients, ingredient]
            )
        }
        if (prevTotalIngredintCount > ingredientList.totalIngredientCount) {
            const ingredientListRow = getReducedIngredientList(ingredient);
            ingredientList.setIngredientList(ingredientListRow)
        }
        emit('update:modelValue', ingredientList.counter)
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
