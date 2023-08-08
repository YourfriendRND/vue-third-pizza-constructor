<template>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
          <source type="image/webp" :srcset="profileStore.user.avatar + '@2x.webp 1x,' + ' '+ profileStore.user.avatar + '@4x.webp 2x'">
          <img :src="profileStore.user.avatar + '@2x.jpg'" :srcset="profileStore.user.avatar + '@4x.jpg'" alt="Василий Ложкин" width="72" height="72">
      </picture>
      <div class="user__name">
          <span>{{ profileStore.user.name }}</span>
      </div>
      <p class="user__phone">Контактный телефон: <span>{{ profileStore.user.phone }}</span></p>
    </div>

    <div class="layout__address">
        <user-address v-for="address in profileStore.addresses" :address="address" />
    </div>

    <div class="layout__address">
      <address-form v-show="profileStore.isAddressFormOpen" :closeHandler="editAddressKeyupHandler" />
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border" @keyup.esc="editAddressKeyupHandler" @click="createAddress">Добавить новый адрес</button>
    </div>
    <delete-modal v-if="profileStore.isDeleteModalShow"></delete-modal>

</template>
<script setup>
import { useProfileStore } from '../store/profile';
import UserAddress from '@/modules/profile/UserAddress.vue';
import AddressForm from '@/modules/profile/AddressForm.vue';
import DeleteModal from '@/modules/profile/DeleteModal.vue';

const profileStore = useProfileStore();

const createAddress = (evt) => {
  profileStore.setAddressAsEditable();
  evt.target.focus();
};

const editAddressKeyupHandler = (evt) => {
  if (evt.type === 'keyup' && profileStore.isAddressFormOpen ) {
    profileStore.setAddressAsEditable();
    profileStore.isAddressFormOpen = false;
  }
};

</script>
<style scoped lang="scss">
@import "@/assets/scss/app.scss";

.layout__button {
    margin-top: 40px;

    button {
      padding: 12px 23px;
    }
}

.user {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-bottom: 33px;
  }
  
  .user__name {
    @include b-s20-h23;
  
    margin-left: 30px;
  
    span {
      display: inline-block;
  
      vertical-align: middle;
    }
  }
  
  .user__button {
    display: inline-block;
  
    cursor: pointer;
    vertical-align: middle;
  }
  
  .user__phone {
    @include b-s16-h19;
  
    width: 100%;
    margin-top: 20px;
  
    span {
      font-weight: 400;
    }
  }
  
.address-form {
    $bl: &;
  
    position: relative;
  
    padding-top: 0;
    padding-bottom: 26px;
  
    &--opened {
      #{$bl}__header {
        padding: 16px;
      }
    }
  
    p {
      @include r-s16-h19;
  
      margin-top: 0;
      margin-bottom: 16px;
      padding: 0 16px;
    }
  
    small {
      @include l-s11-h13;
  
      display: block;
  
      padding: 0 16px;
    }
  }
  
  .address-form__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  
    width: 80%;
    padding: 16px;
  }
  
  .address-form__input {
    width: 100%;
    margin-bottom: 16px;
  
    &--size {
      &--normal {
        width: 60.5%;
      }
  
      &--small {
        width: 18%;
      }
    }
  }
  
  .address-form__buttons {
    display: flex;
    justify-content: flex-end;
  
    padding: 0 16px;
  
    button {
      margin-left: 16px;
      padding: 16px 27px;
    }
  }
  
  .address-form__header {
    @include b-s14-h16;
  
    display: flex;
    align-items: center;
    justify-content: space-between;
  
    margin-bottom: 21px;
    padding: 10px 16px;
  
    border-bottom: 1px solid rgba($green-500, 0.1);
  }

  .icon {
    display: block;
    overflow: hidden;
  
    width: 32px;
    height: 32px;
  
    transition: 0.3s;
  
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: $white;
    background-image: url("@/assets/img/edit.svg");
    background-repeat: no-repeat;
    background-position: center;
  
    &:hover {
      box-shadow: $shadow-light;
    }
  
    &:active {
      box-shadow: $shadow-large;
    }
  
    &:focus {
      box-shadow: $shadow-regular;
    }
  }
  
  
</style>
