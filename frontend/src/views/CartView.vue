<template>
    <form action="test.html" method="post" class="layout-form">
        <main class="content cart">
            <div class="container">
                <div class="cart__title">
                    <h1 class="title title--big">Корзина</h1>
                </div>

                <!-- <div class="sheet cart__empty">
              <p>В корзине нет ни одного товара</p>
            </div> -->

                <ul class="cart-list sheet">
                    <order-item />
                    <order-item />
                </ul>

                <div class="cart__additional">
                    <ul class="additional-list">
                        <additional-order-item />
                        <additional-order-item />
                        <additional-order-item />
                    </ul>
                </div>

                <div class="cart__form">
                    <div class="cart-form">

                        <label class="cart-form__select">
                            <span class="cart-form__label">Получение заказа:</span>

                            <select name="test" class="select">
                                <option value="1">Заберу сам</option>
                                <option value="2">Новый адрес</option>
                                <option value="3">Дом</option>
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
                                    <input type="text" name="street">
                                </label>
                            </div>

                            <div class="cart-form__input cart-form__input--small">
                                <label class="input">
                                    <span>Дом*</span>
                                    <input type="text" name="house">
                                </label>
                            </div>

                            <div class="cart-form__input cart-form__input--small">
                                <label class="input">
                                    <span>Квартира</span>
                                    <input type="text" name="apartment">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <section class="footer">
            <div class="footer__more">
                <router-link :to="{name: 'home'}" class="button button--border button--arrow">Хочу еще одну</router-link>
            </div>
            <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
            <div class="footer__price">
                <b>Итого: 2 228 ₽</b>
            </div>

            <div class="footer__submit">
                <button type="submit" class="button">Оформить заказ</button>
            </div>
        </section>
    </form>
</template>
<script setup>
import OrderItem from '@/modules/cart/OrderItem.vue';
import AdditionalOrderItem from '../modules/cart/AdditionalOrderItem.vue';

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