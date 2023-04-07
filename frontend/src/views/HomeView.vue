<template>
    <main class="content">
      <form action="#" method="post">
  
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
  
          <dough />
  
          <diameter />

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
  
              <div class="sheet__content ingredients">
  
                <sauce />
  
                <ingredient-list 
                  v-model="pizza.ingredientCounter"
                  :modelValue="pizza.ingredientCounter"
                />

              </div>
            </div>
          </div>
  
          <pizza 
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :ingredientList="pizza.ingredientCounter.ingredients"
            :price="pizzaStore.price"
            @drop="addIngredient"
            @name="(evt) => {pizzaStore.setPizzaName(evt.target.value)}"
            :name="pizza.pizzaName"
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

import { useDataStore } from '@/store/data.js';
import { usePizzaStore } from '@/store/pizza.js';

import { reactive } from "vue";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore()

const pizza = reactive({
  pizzaName: pizzaStore.name,
  dough: pizzaStore.getActiveDough.value,
  sauce: pizzaStore.getActiveSauce.value,
  size: pizzaStore.size.value,
  ingredientCounter: dataStore.ingredients.reduce((prev, next) => {
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
  },
  setName (name) {
    pizza.pizzaName = name;
  }
});

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
