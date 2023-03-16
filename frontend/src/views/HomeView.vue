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
  @import "@/assets/scss/ds-system/ds.scss";
  @import "@/assets/scss/mixins/mixins.scss";
  @import "@/assets/scss/visually-hidden.scss";

  .content {
    padding-top: 20px;
  }
  .content__wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 920px;
    margin: 0 auto;
    padding-right: 2.12%;
    padding-bottom: 30px;
    padding-left: 2.12%;
  }

  .content__ingredients {
    width: 527px;
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 15px;
  }
  
  .sheet {
    padding-top: 15px;
    border-radius: 8px;
    background-color: $white;
    box-shadow: $shadow-light;
  }
  .sheet__title {
    padding-right: 18px;
    padding-left: 18px;
  }
  .sheet__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
    padding-top: 18px;
    padding-right: 18px;
    padding-left: 18px;
    border-top: 1px solid rgba($green-500, 0.1);
  }
 
  .title {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    color: $black;
    &--big {
      @include b-s36-h42;
    }
    &--small {
      @include b-s18-h21;
    }
  }

</style>
