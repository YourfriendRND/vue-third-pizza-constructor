<template>
    <main class="content">
      <form action="#" method="post">
  
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
  
          <dough v-model="pizza.dough" :items="doughItems" />
  
          <diameter v-model="pizza.size" :items="sizes"/>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
  
              <div class="sheet__content ingredients">
  
                <sauce v-model="pizza.sauce" :items="sauces" />
  
                <ingredient-list 
                  v-model="pizza.ingredientCounter"
                  :items="ingredientItems"
                  :modelValue="pizza.ingredientCounter"
                />

              </div>
            </div>
          </div>
  
          <pizza 
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :ingredientList="pizza.ingredientCounter.ingredients"
            :price="price"
            @drop="addIngredient"
          />
  
        </div>
  
      </form>
    </main>
</template>

<script setup>
import Dough from "@/modules/constructor/Dough.vue";
import Diameter from "@/modules/constructor/Diameter.vue";
import Sauce from "@/modules/constructor/Sauce.vue";
import IngredientList from "@/modules/constructor/IngredientList.vue";
import Pizza from '@/modules/constructor/Pizza.vue';
import doughRow from '@/mocks/dough.json';
import saucesRow from '@/mocks/sauces.json';
import ingredientsRow from '@/mocks/ingredients.json';
import sizesRow from '@/mocks/sizes.json';

import { normalizeDough, normalizeSauce, normalizeIngredient, normalizeSize } from '@/common/helpers/normalize';
import { reactive, computed } from "vue";
const doughItems = doughRow.map(normalizeDough);
const sauces = saucesRow.map(normalizeSauce);
const ingredientItems = ingredientsRow.map(normalizeIngredient);
const sizes = sizesRow.map(normalizeSize);

const [defaultDoughType] = doughItems;
const [defaultSauce] = sauces;
const [defaultSize] = sizes;

const pizza = reactive({
  dough: defaultDoughType.value,
  sauce: defaultSauce.value,
  size: defaultSize.value,
  ingredientCounter: ingredientItems.reduce((prev, next) => {
    prev[next.value] = {
      counter: 0,
    };
    return prev;
  }, {
    ingredients: [],
  }),
  setIngredients (ingredients) {
    this.ingredients = ingredients;
  },
  increaseCounter (ingredient) {
    this.ingredientCounter[ingredient].counter = this.ingredientCounter[ingredient].counter + 1; 
  }
});

const price = computed(() => {
  const {dough, sauce, ingredients, size} = pizza;
  const targetDough = doughItems.find((item) => item.value === dough);
  const targetSauce = sauces.find((item) => item.value === sauce);
  const sizeTarget = sizes.find((item) => item.value === size);
  const ingredientsPrice = pizza.ingredientCounter.ingredients.reduce((prev, next) =>{
    const targetIngredient = ingredientItems.find((item) => item.value === next);
    const ingredientItemPrice = targetIngredient ? targetIngredient.price : 0;
    return prev + ingredientItemPrice;
  }, 0)

  return ((targetDough ? targetDough.price : 0) + (targetSauce ? targetSauce.price : 0) + ingredientsPrice) * (sizeTarget ? sizeTarget.multiplier : 1);
})

const addIngredient = (ingredient) => {
  pizza.ingredientCounter.ingredients.push(ingredient)
  pizza.ingredientCounter[ingredient].counter++;
}

</script>

<style lang="scss" scoped>
  .content__ingredients {
    width: 527px;
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 15px;
  }

</style>
