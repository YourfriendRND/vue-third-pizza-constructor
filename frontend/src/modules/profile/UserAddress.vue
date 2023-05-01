<template>
    <div class="sheet address-form">
        <div class="address-form__header">
            <b>{{ address.name }}</b>
            <div class="address-form__edit">
                <button type="button" class="icon" @click="editAddress">
                  <span class="visually-hidden">Изменить адрес</span>
                </button>
            </div>
        </div>
        <p>{{ getAddressString(address) }}</p>
        <small>{{ address.comment }}</small>
    </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useProfileStore } from '@/store/profile';

  const profileStore = useProfileStore();

  const props = defineProps({
    address: {
      type: Object
    },
  });

  const getAddressString = (address) => `${address.street}, д. ${address.building} ${address.flat ? ", кв." + address.flat : ""}`;

  const editAddress = () => {
    profileStore.setAddressAsEditable(props.address);
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
    cursor: pointer;
  
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
