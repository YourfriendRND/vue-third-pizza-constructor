<template>
    <div class="content__dough">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
                <label v-for="doughItem in dough" :class="`dough__input dough__input--${doughItem.value}`" :key="doughItem.id">
                    <input type="radio" name="dought" :value="doughItem.value" class="visually-hidden">
                    <img :src="getImage(doughItem.image)" :alt="doughItem.name" />              
                    <b>{{ doughItem.name }}</b>
                    <span>{{ doughItem.description }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
    import doughRow from '@/mocks/dough.json';
    import { normalizeDough, getImage } from '@/common/helpers/normalize';

    const dough = doughRow.map(normalizeDough);

</script>

<style scoped lang="scss">
    @import "@/assets/scss/ds-system/ds.scss";
    @import "@/assets/scss/mixins/mixins.scss";
    @import "@/assets/scss/visually-hidden.scss";
    .content__dough {
        width: 527px;
        margin-top: 15px;
        margin-right: auto;
        margin-bottom: 15px;
    }
    .sheet {
        padding-top: 15px;
        border-radius: 8px;
        background-color: $white;
        box-shadow: $shadow-light;
    }
    .sheet__title {
        padding-right: 18px;
        padding-left: 18px;
    }

    .sheet__content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 8px;
        padding-top: 18px;
        padding-right: 18px;
        padding-left: 18px;
        border-top: 1px solid rgba($green-500, 0.1);
    }

    .title {
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        color: $black;
    &--big {
            @include b-s36-h42;
        }
    &--small {
            @include b-s18-h21;
        }
    }

    .dough__input {
        position: relative;
        margin-right: 8%;
        margin-bottom: 20px;
        padding-left: 50px;
        cursor: pointer;
    img {
        @include p_center-v;
        width: 36px;
        height: 36px;
        transition: 0.3s;
        border-radius: 50%;
    }
    b {
        @include r-s16-h19;
    }
    span {
        @include l-s11-h13;
        display: block;
    }
    &:hover {
        img {
            box-shadow: $shadow-regular;
        }
    }
    input {
        &:checked + img {
            box-shadow: $shadow-large;
        }
    }
  }

</style>
