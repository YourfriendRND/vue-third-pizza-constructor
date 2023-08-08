<template>
    <form action="test.html" method="post" class="address-form address-form--opened sheet" @keyup.esc="closeHandler" @click="log" @submit.prevent>
        <div class="address-form__header">
            <b>{{ profileStore.addressName }}</b>
        </div>

        <div class="address-form__wrapper">
            <div class="address-form__input">
                <label class="input">
                    <span>Название адреса*</span>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Введите название адреса"
                        :value="profileStore.editableAddress.name"
                        @input="profileStore.setEditableField($event.target.value, $event.target.name)"
                        required>
                </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
                <label class="input">
                    <span>Улица*</span>
                    <input 
                        type="text" 
                        name="street" 
                        placeholder="Введите название улицы" 
                        :value="profileStore.editableAddress.street"
                        @input="profileStore.setEditableField($event.target.value, $event.target.name)"
                        required>
                </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
                <label class="input">
                    <span>Дом*</span>
                    <input 
                        type="text" 
                        name="building" 
                        placeholder="Введите номер дома" 
                        :value="profileStore.editableAddress.building"
                        @input="profileStore.setEditableField($event.target.value, $event.target.name)"
                        required>
                </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
                <label class="input">
                    <span>Квартира</span>
                    <input 
                        type="text" 
                        name="flat" 
                        placeholder="Введите № квартиры"
                        :value="profileStore.editableAddress.flat"
                        @input="profileStore.setEditableField($event.target.value, $event.target.name)"
                        >
                </label>
            </div>
            <div class="address-form__input">
                <label class="input">
                    <span>Комментарий</span>
                    <input 
                        type="text" 
                        name="comment" 
                        placeholder="Введите комментарий"
                        :value="profileStore.editableAddress.comment"
                        @input="profileStore.setEditableField($event.target.value, $event.target.name)"
                        >
                </label>
            </div>
        </div>
        <div class="address-form__helpers">
          <span class="address-form__helpers-text">
            {{ getValidationFormHelperText() }}
          </span>
        </div>

        <div class="address-form__buttons">
            <button type="button" class="button button--transparent" @click="deleteAdderssHandler">Удалить</button>
            <button 
              type="submit" 
              class="button" 
              @click="profileStore.setNewAddress()"
              :disabled="isSubmitBtnDisable()"
              >
                Сохранить
              </button>
        </div>
    </form>
</template>

<script setup>
import { defineProps } from 'vue';
import { useProfileStore } from '@/store/profile';
const profileStore = useProfileStore();

const deleteAdderssHandler = () => {
  console.log(profileStore.editableAddress.id);
  // profileStore.deleteAddress(profileStore.editableAddress.id);
  if (profileStore.editableAddress.id && !profileStore.isDeleteModalShow) {
    profileStore.isDeleteModalShow = true;
  }
};

const props = defineProps({
  closeHandler: {
    type: Function
  },
});
 
const isSubmitBtnDisable = () => {
  const name = profileStore.editableAddress.name;
  const street = profileStore.editableAddress.street;
  const building = profileStore.editableAddress.building;

  if (!name || name.length < 3) {
    return true;
  }

  if (!street || street.length < 3) {
    return true;
  }

  if (!building) {
    return true;
  }

  return false;
};

const getValidationFormHelperText = () => {
  const name = profileStore.editableAddress.name;
  const street = profileStore.editableAddress.street;
  const building = profileStore.editableAddress.building;

  if (!name || name.length < 3) {
    return 'Добавьте название адреса, название адреса не должно быть коротким (минимум 3 символа)';
  }

  if (!street || street.length < 3) {
    return 'Добавьте название улицы, название улицы не должно быть коротким (минимум 3 символа)';
  }

  if (!building) {
    return 'Укажите номер дома';
  }

};

</script>

<style scoped lang="scss">
@import "@/assets/scss/common.scss";

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
  .address-form__helpers {
    margin-left: 16px;
  }
  
  .address-form__helpers-text {
    color: $red-700;
    font-size: 12px;
  }
  
</style>
