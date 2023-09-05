<template>
  <div class="delete-form">
    <div class="delete-form__title">
      <h1 class="title title--small">Действительно удалить {{ entityName }}?</h1>
    </div>
    <div class="delete-modal__controller">
      <button type="button" class="button" @click="props.agreeHandler">Да, удалить</button>
      <button type="button" class="button" @click="props.cancelHandler">Нет, передумал</button>
    </div>
  </div>
</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps({
  entityName: {
    type: String,
    default: 'test'
  },
  agreeHandler: {
    type: Function,
    default: () => { }
  },
  cancelHandler: {
    type: Function,
    default: () => { }
  }
})

</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/ds-system/ds.scss';

.delete-modal__controller {
  display: flex
}

.delete-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.delete-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.delete-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {

    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {

    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>