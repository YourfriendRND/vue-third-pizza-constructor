<template>
    <div class="content__dough">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
                <label v-for="doughItem in dataStore.getDough" :class="`dough__input dough__input--${doughItem.value}`" :key="doughItem.id">
                    <input 
                        type="radio" 
                        class="visually-hidden" 
                        name="dough"
                        :value="doughItem.value"
                        :checked="doughItem.value === pizzaStore.getActiveDough.value"
                        @input="pizzaStore.setDough(doughItem.id)"
                    />
                    <img :src="getImage(doughItem.image)" :alt="doughItem.name" />              
                    <b>{{ doughItem.name }}</b>
                    <span>{{ doughItem.description }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getImage } from '@/common/helpers/normalize';
    import { useDataStore } from '@/store/data';
    import { usePizzaStore } from '@/store/pizza';

    const dataStore = useDataStore(); 
    const pizzaStore = usePizzaStore();

</script>

<style scoped lang="scss">
    @import "@/assets/scss/common.scss";

    .content__dough {
        width: 527px;
        margin-top: 15px;
        margin-right: auto;
        margin-bottom: 15px;
    }
    
    .dough__input {
        position: relative;
        margin-right: 8%;
        margin-bottom: 20px;
        padding-left: 50px;
        cursor: pointer;
    img {
        @include p_center-v;
        width: 36px;
        height: 36px;
        transition: 0.3s;
        border-radius: 50%;
    }
    b {
        @include r-s16-h19;
    }
    span {
        @include l-s11-h13;
        display: block;
    }
    &:hover {
        img {
            box-shadow: $shadow-regular;
        }
    }
    input {
        &:checked + img {
            box-shadow: $shadow-large;
        }
    }
  }

</style>
