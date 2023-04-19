<template>
    <div class="cart__form">
        <div class="cart-form">

            <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="delivery" class="select" @change="changeDelivery">
                    <option :value="DeliveryTypes.Self" @click="setDeliveryAddressId" :selected="DeliveryTypes.Self === cartStore.deliveryType" id="0">Заберу сам</option>
                    <option :value="DeliveryTypes.New" @click="setDeliveryAddressId" :selected="DeliveryTypes.New === cartStore.deliveryType" id="0">Новый адрес</option>
                    <option v-for="address in profileStore.addresses"
                        :selected="DeliveryTypes.Address === cartStore.deliveryType && address.id === Number(profileStore.currentAddressId)" 
                        @click="setDeliveryAddressId" 
                        :id="address.id" 
                        :value="DeliveryTypes.Address">
                        {{ address.name }}
                    </option>
                </select>
            </label>

            <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input 
                    type="text" 
                    name="tel" 
                    placeholder="+7 999-999-99-99" 
                    @input="cartStore.setPhone($event.target.value)"
                    :value="cartStore.phone"
                >
            </label>

            <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                    <label class="input">
                        <span>Улица*</span>
                        <input 
                            type="text" 
                            name="street" 
                            :disabled="cartStore.deliveryType !== DeliveryTypes.New"
                            :value="cartStore.deliveryType !== DeliveryTypes.New ? profileStore.street : cartStore.address.street"
                            @input="cartStore.setStreet($event.target.value)"
                        >
                    </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                    <label class="input">
                        <span>Дом*</span>
                        <input 
                            type="text" 
                            name="house" 
                            :disabled="cartStore.deliveryType !== DeliveryTypes.New"
                            :value="cartStore.deliveryType !== DeliveryTypes.New ? profileStore.building : cartStore.address.building"
                            @input="cartStore.setBuilding($event.target.value)"
                        >
                    </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                    <label class="input">
                        <span>Квартира</span>
                        <input 
                            type="text" 
                            name="apartment" 
                            :disabled="cartStore.deliveryType !== DeliveryTypes.New"
                            :value="cartStore.deliveryType !== DeliveryTypes.New ? profileStore.flat : cartStore.address.flat"
                            @input="cartStore.setFlat($event.target.value)"
                        >
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DeliveryTypes } from '@/common/constants';
import { useCartStore } from '@/store/cart';
import { useProfileStore } from '@/store/profile';

const cartStore = useCartStore();
const profileStore = useProfileStore();

const changeDelivery = ($event) => {
    cartStore.setDeliveryType($event.target.value);
};

const setDeliveryAddressId = ($event) => {
    profileStore.setAddressId($event.target.id);
    cartStore.setStreet(profileStore.street);
    cartStore.setFlat(profileStore.flat);
    cartStore.setBuilding(profileStore.building);
};

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