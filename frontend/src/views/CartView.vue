<template>
    <form action="test.html" method="post" class="layout-form" @submit.prevent  @submit="submitHandler">
        <main class="content cart">
            <div class="container">
                <div class="cart__title">
                    <h1 class="title title--big">Корзина</h1>
                </div>

                <list-empty v-if="!cartStore.pizzas.length" />

                <div class="cart__container" v-else>
                    <ul class="cart-list sheet" >
                        <order-item-cart v-for="order in cartStore.pizzas"
                            :order="order"
                        />
                    </ul>
    
                    <div class="cart__additional">
                        <ul class="additional-list" >
                            <additional-order-item 
                            v-for="item in cartStore.misc" 
                            :misc="item"
                            />
                        </ul>
                    </div>
    
                    <address-form />

                </div>
            </div>
        </main>
        <section class="footer">
            <div class="footer__more">
                <router-link :to="{name: 'home'}" class="button button--border button--arrow">Хочу еще одну</router-link>
            </div>
            <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
            <div class="footer__price">
                <b>Итого: {{ cartStore.orderPrice }} ₽</b>
            </div>

            <div class="footer__submit">
                <button 
                  type="submit" 
                  class="button" 
                  :disabled="!cartStore.isOrderAvailabale"
                >
                  Оформить заказ
                </button>
            </div>
        </section>
    </form>
</template>
<script setup>
import { DeliveryTypes } from '@/common/constants';
import OrderItemCart from '@/modules/cart/OrderItemCart.vue';
import AdditionalOrderItem from '@/modules/cart/AdditionalOrderItem.vue';
import AddressForm from '@/modules/cart/AddressForm.vue';
import ListEmpty from '@/common/components/ListEmpty.vue';
import { useCartStore } from '@/store/cart';
import { useOrderStore } from '@/store/orders';
import { useProfileStore } from '../store/profile';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const orderStore = useOrderStore();
const profileStore = useProfileStore();
const router = useRouter();

const submitHandler = ($event) => {
  $event.preventDefault();
  
  if (cartStore.deliveryType === DeliveryTypes.New) {
    profileStore.addNewAddress(cartStore.address);
  }

  orderStore.addOrder({
    deliveryType: cartStore.deliveryType,
    clientPhone: cartStore.phone,
    addressId: profileStore.currentAddressId,
    address: profileStore.addressName,
    pizzas: [...cartStore.pizzas],
    misc: [...cartStore.misc],
    price: cartStore.orderPrice
  });

  cartStore.initStore();
  
  router.push('/user/orders');
}

</script>
<style scoped lang="scss">
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/ds-system/ds.scss';

.layout-form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.container {
    width: 770px;
    margin: 0 auto;
}

.cart__title {
    margin-bottom: 15px;
}

.cart__additional {
    margin-top: 15px;
    margin-bottom: 25px;
}

.cart__empty {
    padding: 20px 30px;
}

.cart-list {
    @include clear-list;

    padding: 15px 0;
}

.additional-list {
    @include clear-list;

    display: flex;
    flex-wrap: wrap;
}

.footer {
    display: flex;
    align-items: center;

    margin-top: auto;
    padding: 25px 2.12%;

    background-color: rgba($green-500, 0.1);
}

.footer__more {
    width: 220px;
    margin-right: 16px;

    a {
        padding-top: 16px;
        padding-bottom: 16px;
    }
}

.footer__text {
    @include l-s11-h13;

    color: rgba($black, 0.5);
}

.footer__price {
    @include b-s24-h28;

    margin-right: 12px;
    margin-left: auto;
}

.footer__submit {
    button {
        padding: 16px 14px;
    }
}

.counter {
    display: flex;

    justify-content: space-between;
    align-items: center;
}

.counter__button {
    $el: &;
    $size_icon: 50%;
  
    position: relative;
  
    display: block;
  
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
  
    cursor: pointer;
    transition: 0.3s;
  
    border: none;
    border-radius: 50%;
    outline: none;
  
    &--minus {
      background-color: $purple-100;
  
      &::before {
        @include p_center-all;
  
        width: $size_icon;
        height: 2px;
  
        content: "";
  
        border-radius: 2px;
        background-color: $black;
      }
  
      &:hover:not(:active):not(:disabled) {
        background-color: $purple-200;
      }
  
      &:active:not(:disabled) {
        background-color: $purple-300;
      }
  
      &:focus:not(:disabled) {
        box-shadow: $shadow-regular;
      }
  
      &:disabled {
        cursor: default;
  
        &::before {
          opacity: 0.1;
        }
      }
    }
  
    &--plus {
      background-color: $green-500;
  
      &::before {
        @include p_center-all;
  
        width: $size_icon;
        height: 2px;
  
        content: "";
  
        border-radius: 2px;
        background-color: $white;
      }
  
      &::after {
        @include p_center-all;
  
        width: $size_icon;
        height: 2px;
  
        content: "";
        transform: translate(-50%, -50%) rotate(90deg);
  
        border-radius: 2px;
        background-color: $white;
      }
  
      &:hover:not(:active):not(:disabled) {
        background-color: $green-400;
      }
  
      &:active:not(:disabled) {
        background-color: $green-600;
      }
  
      &:focus:not(:disabled) {
        box-shadow: $shadow-regular;
      }
  
      &:disabled {
        cursor: default;
  
        opacity: 0.3;
      }
    }
  
    &--orange {
      background-color: $orange-200;
  
      &:hover:not(:active):not(:disabled) {
        background-color: $orange-100;
      }
  
      &:active:not(:disabled) {
        background-color: $orange-300;
      }
    }
  }
  
  .counter__input {
    @include r-s14-h16;
  
    box-sizing: border-box;
    width: 22px;
    margin: 0;
    padding: 0 3px;
  
    text-align: center;
  
    color: $black;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: transparent;
  
    &:focus {
      box-shadow: inset $shadow-regular;
    }
  }
  
</style>