<template>
    <div class="cart__form">
        <div class="cart-form">

            <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="delivery" class="select" @change="cartStore.setDeliveryType($event.target.value)">
                    <option :value=DeliveryTypes.Self :selected="cartStore.deliveryType === DeliveryTypes.Self">Заберу сам</option>
                    <option :value="DeliveryTypes.New" :selected="cartStore.deliveryType === DeliveryTypes.New">Новый адрес</option>
                    <option :value="DeliveryTypes.Home" :selected="cartStore.deliveryType === DeliveryTypes.Home">Дом</option>
                </select>
            </label>

            <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99">
            </label>

            <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                    <label class="input">
                        <span>Улица*</span>
                        <input type="text" name="street" :disabled="cartStore.deliveryType === DeliveryTypes.Self || cartStore.deliveryType === DeliveryTypes.Home">
                    </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                    <label class="input">
                        <span>Дом*</span>
                        <input type="text" name="house" :disabled="cartStore.deliveryType === DeliveryTypes.Self || cartStore.deliveryType === DeliveryTypes.Home">
                    </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                    <label class="input">
                        <span>Квартира</span>
                        <input type="text" name="apartment" :disabled="cartStore.deliveryType === DeliveryTypes.Self || cartStore.deliveryType === DeliveryTypes.Home">
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DeliveryTypes } from '@/common/constants';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();


</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';


.cart-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.cart-form__select {
    display: flex;
    align-items: center;

    margin-right: auto;

    span {
        margin-right: 16px;
    }
}

.cart-form__label {
    @include b-s16-h19;

    white-space: nowrap;
}

.cart-form__address {
    display: flex;
    align-items: center;

    width: 100%;
    margin-top: 20px;
}

.cart-form__input {
    flex-grow: 1;

    margin-bottom: 20px;
    margin-left: 16px;

    &--small {
        max-width: 120px;
    }

    :disabled {
        background-color: $silver-300;
        
        &:hover {
            border-color: $purple-400;
        }
    }

    
}


</style>