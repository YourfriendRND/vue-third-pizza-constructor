<template>
    <div class="sheet cart__empty">
        <p v-if="props.listName === ApplicationViews.cart">
            В корзине нет ни одного товара
        </p>

        <p v-else>
            Список заказов пуст
        </p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ApplicationViews } from '@/common/constants';

const props = defineProps({
    listName: {
        type: String,
        default: ApplicationViews.cart
    }
})

</script>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
.sheet {
    padding-top: 15px;

    border-radius: 8px;
    background-color: $white;
    box-shadow: $shadow-light;
}

.cart__empty {
    padding: 20px 30px;
}
</style>

