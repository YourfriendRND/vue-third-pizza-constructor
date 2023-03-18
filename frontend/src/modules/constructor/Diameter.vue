<template>
    <div class="content__diameter">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
                <label 
                    class="diameter__input"
                    v-for="size in items" 
                    :class="`diameter_input--${size.value}`" 
                    :key="size.id"
                >
                <input 
                    type="radio" 
                    name="diameter" 
                    class="visually-hidden"
                    :value="size.value"
                    :checked="modelValue === size.value"
                    @input="emit('update:modelValue', size.value)"
                >
                <span>{{ size.name }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    defineProps({
        modelValue: {
            type: String,
        },
        items: {
            type: Array,
            default: () => [],
        }
    });

    const emit = defineEmits(["update:modelValue"]);

</script>

<style scoped lang="scss">
    @import "@/assets/scss/ds-system/ds.scss";
    @import "@/assets/scss/mixins/mixins.scss";
    @import "@/assets/scss/visually-hidden.scss";
    .content__diameter {
        width: 373px;
        margin-top: 15px;
        margin-bottom: 15px;
    };

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
    &--small {
        span::before {
            background-size: 18px;
        }
    }
    &--normal {
        span::before {
            background-size: 29px;
        }
    }
    &--big {
        span::before {
            background-size: 100%;
        }
    }
    &:hover {
        span::before {
            box-shadow: $shadow-regular;
        }
    }
    input {
        &:checked + span::before {
            box-shadow: $shadow-large;
        }
    }
  }

</style>
