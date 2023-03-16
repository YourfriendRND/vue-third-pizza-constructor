<template>
    <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
            
            <li class="ingredients__item" v-for="ingridient in ingridients" :key="ingridient.id">
                <app-drag :draggable="true" :dataTransfer="ingridient">
                    <div :class="`filling filling--${ingridient.value}`">
                        <img
                        :src="getImage(ingridient.image)"
                        :alt="ingridient.name"
                        width="30"
                        height="30"
                        />
                        {{ ingridient.name }}
                    </div>
                </app-drag>
                <div class="counter counter--orange ingredients__counter">
                    <counter-button 
                        :counterType="CounterTypes.DecrementType"
                        :counterText="CounterValue.DecrementValue"
                    />
                    {{ counter }}
                    <counter-button 
                        :counterType="CounterTypes.IncrementType"
                        :counterText="CounterValue.IncrementValue"
                    />
                </div>        
            </li>
        </ul>

    </div>
</template>

<script setup>
    import CounterButton from '@/common/components/CounterButton.vue';
    import AppDrag from '@/common/components/AppDrag.vue';
  
    import ingridientsRow from '@/mocks/ingredients.json';
    import { 
        normalizeIngridient, 
        getImage
    } from '@/common/helpers/normalize';
    import { CounterTypes, CounterValue } from '@/common/constants/index';
    import { ref } from "vue";
    const counter = ref(0);

    const ingridients = ingridientsRow.map(normalizeIngridient);
    
 

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
