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
  
                <ingredient-list />

              </div>
            </div>
          </div>
  
          <pizza />
  
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

</script>

<style lang="scss" scoped>
  .content__ingredients {
    width: 527px;
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 15px;
  }

</style>
