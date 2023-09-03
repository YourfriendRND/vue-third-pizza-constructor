<template>
    <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
    </div>

    <list-empty :listName="ApplicationViews.orders" v-if="!orderStore.previosOrders.length" />
  
    <order-item-history v-for="order in orderStore.previosOrders" :orderHistoryData="order" />

    <delete-modal 
        v-if="orderStore.isDeleteModalShow" 
        :entityName="`Заказ #${orderStore.activeOrderId}`"
        :agreeHandler="orderStore.deleteOrder"
        :cancelHandler="orderStore.resetActiveOrder"
    />

</template>
<script setup>
import OrderItemHistory from '@/modules/orders/OrderItemHistory.vue';
import ListEmpty from '@/common/components/ListEmpty.vue';
import DeleteModal from '@/common/components/DeleteModal.vue';
import { useOrderStore } from '../store/orders';
import { ApplicationViews } from '@/common/constants';

const orderStore = useOrderStore();

</script>

<style scoped lang="scss"></style>
