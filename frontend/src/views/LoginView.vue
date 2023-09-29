<template>
    <div class="sign-form">
        <router-link :to="{name: 'home'}" class="close close--white">
            <span class="visually-hidden">Закрыть форму авторизации</span>
        </router-link>
        <div class="sign-form__title">
            <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        </div>
        <form action="test.html" method="post" @submit="submit">
            <div class="sign-form__input">
                <label class="input">
                    <span>E-mail</span>
                    <input
                    type="email" 
                    name="email" 
                    placeholder="example@mail.ru" 
                    :class=getInputClassName(formState.emailError)
                    @input="handleFormField"
                    >
                </label>
                
                <span v-show="formState.error && formState.emailError" class="sign-form__field-error-message">{{ formState.error }}</span>
            </div>

            <div class="sign-form__input">
                <label class="input">
                    <span>Пароль</span>
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="***********"
                      :class=getInputClassName(formState.passwordError)
                      @input="handleFormField"
                    >
                </label>

                <span v-show="formState.error && formState.passwordError" class="sign-form__field-error-message">{{ formState.error }}</span>
            </div>
            <button 
              type="submit" 
              class="button"
              :disabled="formState.isDisabled"            
              >
            Авторизоваться
          </button>
        </form>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import authService from '@/services/auth-service';

console.log(authService)
const submit = async (evt) => {
  evt.preventDefault();
  const somth = await authService.whoAmI();
  console.log(somth);
  
}

const user = reactive({
  email: '',
  password: ''
});

const formState = reactive({
  isDisabled: true,
  errorMessage: '',
  emailError: false,
  passwordError: false,
});

const getInputClassName = (status) => status ? 'sign-form__input-error' : '';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])/i

const validateLoginField = ({ email, password }) => {
  switch(false) {
    case email: return {isEmailValid: false, isPasswordValid: true, message: 'E-mail address is empty'};
    case emailRegex.test(email): return {isEmailValid: false, isPasswordValid: true, message: 'E-mail address is invalid'};
    case password: return {isEmailValid: true, isPasswordValid: false, message: 'Password is empty'};
    case password.length >= 5: return {isEmailValid: true, isPasswordValid: false, message: 'Password too short'};
    case passwordRegex.test(password): return {isEmailValid: true, isPasswordValid: false, message: 'Password is invalid'};
    default: return {isEmailValid: true, isPasswordValid: true, message: ''};
  }
}

const handleFormField = (evt) => {
  const fieldName = evt.target.name;
  const value = evt.target.value;
  user[fieldName] = value;
  const validation = validateLoginField(user)
  formState.isDisabled = validation.isEmailValid && validation.isPasswordValid ? false : true;
  formState.error = validation.isEmailValid && validation.isPasswordValid ? '' : validation.message;
  formState.emailError = !validation.isEmailValid;
  formState.passwordError = !validation.isPasswordValid;
};

</script>
<style scoped lang="scss">
  @import '@/assets/scss/mixins/mixins.scss';
  @import '@/assets/scss/ds-system/ds.scss';
  .sign-form {
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

  .sign-form__title {
    margin-bottom: 24px;
    text-align: center;
  }

  .sign-form__input {
    margin-bottom: 16px;
  }

  .sign-form__input-error {
    border-color: red;

    &:focus {
      border-color: red;
    }
  }

  .sign-form__field-error-message {
    display: block;
    color: red;
    font-size: 12px;
    margin-top: 7px;
    margin-left: 7px;
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