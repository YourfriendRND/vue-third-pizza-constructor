<template>
    <li class="additional-list__item sheet">
        <p class="additional-list__description">
            <img :src="getImage(`${misc.image}.svg`)" width="39" height="60" :alt="misc.name">
            <span>{{ misc.name }}</span>
        </p>

        <div class="additional-list__wrapper">
            <app-counter class="counter additional-list__counter"
                :isOrange="true"
                :modelValue="counter.misc.count"
                v-model="counter.misc.count"
            />

            <div class="additional-list__price">
                <b>× {{ misc.price }}</b>
            </div>
        </div>
    </li>
</template>

<script setup>
import AppCounter from '@/common/components/AppCounter.vue';
import { getImage } from '@/common/helpers/normalize';
import { defineProps, reactive, watch } from 'vue';
import { useCartStore } from "@/store/cart";

const cartStore = useCartStore();

const props = defineProps({
    misc: {
        type: Object,
        default: () => {},
    }
});

const counter = reactive({
    misc: {
        name: props.misc.name,
        count: props.misc.count
    }
});

watch(counter.misc, () => {
    cartStore.updateMisc({...counter.misc});
});

</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/ds-system/ds.scss';

.sheet {
    padding-top: 15px;

    border-radius: 8px;
    background-color: $white;
    box-shadow: $shadow-light;
}

.additional-list__item {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    width: 200px;
    margin-right: 15px;
    margin-bottom: 15px;
    padding-top: 15px;
    padding-bottom: 15px;

    img {
        margin-right: 10px;
        margin-left: 15px;
    }

    span {
        @include b-s14-h16;

        display: inline;

        width: 100px;
        margin-right: 15px;
    }
}

.additional-list__description {
    display: flex;
    align-items: flex-start;

    margin: 0;
    margin-bottom: 8px;
}

.additional-list__wrapper {
    display: flex;
    align-items: center;

    box-sizing: border-box;
    width: 100%;
    margin-top: auto;
    padding-top: 18px;
    padding-right: 15px;
    padding-left: 15px;

    border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
    width: 54px;
    margin-right: auto;
}

.additional-list__price {
    @include b-s16-h19;
}
</style>
