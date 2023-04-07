<template>
    <div class="content__diameter">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
                <label class="diameter__input" v-for="size in dataStore.getSizes" :class="`diameter_input--${size.value}`"
                    :key="size.id">
                    <input type="radio" name="diameter" class="visually-hidden" :value="size.value"
                        :checked="size.value === pizzaStore.size.value" @input="pizzaStore.setSize(size.id)">
                    <span :class="`diameter--${size.value}`">{{ size.name }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDataStore } from '@/store/data';
import { usePizzaStore } from '@/store/pizza';

const dataStore = useDataStore(); 
const pizzaStore = usePizzaStore();

</script>

<style lang="scss">
    @import "@/assets/scss/common.scss";

    .content__diameter {
        width: 373px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .diameter__input {
        margin-right: 8.7%;
        margin-bottom: 20px;
        padding-top: 7px;
        padding-bottom: 6px;

        cursor: pointer;

        span {
            @include r-s16-h19;

            position: relative;

            padding-left: 46px;

            &::before {
                @include p_center_v;

                width: 36px;
                height: 36px;

                content: "";
                transition: 0.3s;

                border-radius: 50%;
                background-color: $green-100;
                background-image: url("@/assets/img/diameter.svg");
                background-repeat: no-repeat;
                background-position: center;
            }
        }

        &:nth-child(3n) {
            margin-right: 0;
        }

        &:hover {
            span::before {
                box-shadow: $shadow-regular;
            }
        }

        input {
            &:checked+span::before {
                box-shadow: $shadow-large;
            }
        }
    }
    .diameter {
        &--small::before {
            background-size: 18px;
        }
        &--normal::before {
            background-size: 29px;
        }
        &--big::before {
            background-size: 100%;
        }
    }

</style>
