<template>
    <ul class="order__additional">
        <li v-for="item in misc">
            <img :src="getImage(`${item.image}.svg`)" width="20" height="30" :alt="item.name">
            <p>
                <span>{{ getItemName(item) }}</span>
                <b>{{ item.price * item.count }} ₽</b>
              </p>
        </li>
    </ul>
</template>

<script setup>
import { defineProps } from 'vue';
import { getImage } from '@/common/helpers/normalize';

const props = defineProps({
    misc: {
        type: Array,
        default: () => {}
    }
});

const getItemName = (item) => {
    if (item.count < 1) {
        return item.name 
    }

    return `${item.name} x${item.count}` 
};

</script>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";
.order__additional {
    @include clear-list;

    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 5px;
    padding-left: 80px;

    li {
        @include b-s11-h16;

        width: 150px;
        margin-right: 24px;
        margin-bottom: 10px;
    }

    p {
        margin: 0;
    }

    img {
        float: left;
        margin-right: 7px;
    }

    b {
        display: block;
    }
}


</style>