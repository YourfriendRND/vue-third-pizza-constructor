import { defineStore } from "pinia";
import { normalizeDough, normalizeSauce, normalizeIngredient, normalizeSize } from '@/common/helpers/normalize';
import misc from '@/mocks/misc.json';
import doughRow from '@/mocks/dough.json';
import saucesRow from '@/mocks/sauces.json';
import ingredientsRow from '@/mocks/ingredients.json';
import sizesRow from '@/mocks/sizes.json';

const doughItems = doughRow.map(normalizeDough);
const sauces = saucesRow.map(normalizeSauce);
const ingredientItems = ingredientsRow.map(normalizeIngredient);
const sizes = sizesRow.map(normalizeSize);

export const useDataStore = defineStore('data', {
    state: () => ({
        dough: doughItems,
        ingredients: ingredientItems,
        sauces: sauces,
        sizes: sizes,
        misc: misc
    }),
    getters: {
        getDough: state => state.dough,
        getIngredients: state => state.ingredients,
        getSause: state => state.sauces,
        getSizes: state => state.sizes,
    },
    actions: {},
});
