<template>
    <main class="content">
        <form action="#" method="post">
    
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>
    
            <div class="content__dough">
    
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите тесто</h2>
    
                <div class="sheet__content dough" >
                  <label v-for="doughItem in dough" :class="`dough__input dough__input--${doughItem.value}`" :key="doughItem.id">
                    <input type="radio" name="dought" :value="doughItem.value" class="visually-hidden">
                    <img :src="getImage(doughItem.image)" :alt="doughItem.name" />
                    <b>{{ doughItem.name }}</b>
                    <span>{{ doughItem.description }}</span>
                  </label>
                </div>
    
              </div>
    
            </div>
    
            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>
    
                <div class="sheet__content diameter">
                  <label v-for="size in sizes" :class="`diameter__input diameter_input--${size.value}`" :key="size.id">
                    <input type="radio" name="diameter" :value="size.value" class="visually-hidden">
                    <span>{{ size.name }}</span>
                  </label>
                </div>
              </div>
            </div>
    
            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
    
                <div class="sheet__content ingredients">
    
                  <div class="ingredients__sauce">
                    <p>Основной соус:</p>
    
                    <label v-for="sauce in sauces" :key="sauce.id" class="radio ingredients__input">
                      <input type="radio" name="sauce" :value="sauce.value">
                      <span>{{ sauce.name }}</span>
                    </label>
                  </div>
    
                  <div class="ingredients__filling">
                    <p>Начинка:</p>
    
                    <ul class="ingredients__list">
                      <li class="ingredients__item" v-for="ingridient in ingridients" :key="ingridient.id">
                        <div :class="`filling filling--${ingridient.value}`">
                          <img
                            :src="getImage(ingridient.image)"
                            :alt="ingridient.name"
                            width="30"
                            height="30"
                          />
                          {{ ingridient.name }}
                        </div>
    
                        <div class="counter counter--orange ingredients__counter">
                          <button type="button" class="counter__button counter__button--minus" disabled>
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input type="text" name="counter" class="counter__input" value="0">
                          <button type="button" class="counter__button counter__button--plus">
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                    </ul>
    
                  </div>
    
                </div>
              </div>
            </div>
    
            <div class="content__pizza">
              <label class="input">
                <span class="visually-hidden">Название пиццы</span>
                <input type="text" name="pizza_name" placeholder="Введите название пиццы">
              </label>
    
              <div class="content__constructor">
                <div class="pizza pizza--foundation--big-tomato">
                  <div class="pizza__wrapper">
                    <div class="pizza__filling pizza__filling--ananas"></div>
                    <div class="pizza__filling pizza__filling--bacon"></div>
                    <div class="pizza__filling pizza__filling--cheddar"></div>
                  </div>
                </div>
              </div>
    
              <div class="content__result">
                <p>Итого: 0 ₽</p>
                <button type="button" class="button" disabled>Готовьте!</button>
              </div>
            </div>
    
          </div>
    
        </form>
      </main>
</template>

<script setup>
import doughRow from '../mocks/dough.json';
import ingridientsRow from '../mocks/ingredients.json';
import saucesRow from '../mocks/sauces.json';
import sizesRow from '../mocks/sizes.json';

import { 
  normalizeSize, 
  normalizeIngridient, 
  normalizeSauce, 
  normalizeDough,
  getImage
} from '../common/helpers/normalize'

const dough = doughRow.map(normalizeDough);
const sizes = sizesRow.map(normalizeSize);
const sauces = saucesRow.map(normalizeSauce);
const ingridients = ingridientsRow.map(normalizeIngridient);

</script>