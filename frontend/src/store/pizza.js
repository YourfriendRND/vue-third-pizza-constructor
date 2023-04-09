import uniqid from 'uniqid';
import { defineStore } from "pinia"
import { useDataStore } from "./data";

const dataStore = useDataStore();

export const usePizzaStore = defineStore('pizza', {
    state: () => ({
        index: null,
        name: "",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        ingredients: [],
        price: 0
    }),
    actions: {
        setPizzaName (name) {
            this.name = name
        },

        setDough (doughId) {
            this.doughId = doughId;
        },

        setSize (sizeId) {
            this.sizeId = sizeId;
        },

        setSause (sauceId) {
            this.sauceId = sauceId;
        },

        addIngredient (ingredient) {
            this.ingredients.push(ingredient);
        },

        setIngredients (ingredientAction) {
            if (ingredientAction.type === 'increase') {
                this.ingredients = [...this.ingredients, ingredientAction.payload.ingredient];
            } else {
                const targetIndex = this.ingredients.lastIndexOf((ingredientAction.payload.ingredient));
                const ingredientListRow = targetIndex !== -1 
                    ? [...this.ingredients.slice(0, targetIndex), ...this.ingredients.slice(targetIndex + 1)]
                    : [...this.ingredients];
                this.ingredients = ingredientListRow;
            }
        },

        setInitPizza () {
            this.name = "";
            this.sauceId = 0;
            this.doughId = 0;
            this.sizeId = 0;
            this.ingredients = [];
            this.price = 0;
        },

    },
    getters: {   
        activeSauce: state => {
            const [defaultSauce] = dataStore.sauces;
            const targetSauce = dataStore.sauces.find((sauce) => state.sauceId === sauce.id);
            return targetSauce ? targetSauce : defaultSauce;  
        },

        activeDough: state => {
            const [defaultDoughType] = dataStore.dough;
            const targetDough = dataStore.dough.find((dough) => state.doughId === dough.id);
            return targetDough ? targetDough : defaultDoughType;
        },

        activeSize: state => {
            const [defaultSize] = dataStore.sizes;
            const targetSize = dataStore.sizes.find((size) => state.sizeId === size.id);
            return targetSize ? targetSize : defaultSize;
        },

        ingredientPrice: state => {
            const ingredients = dataStore.ingredients;
            return state.ingredients.reduce((acc, ingredientItem) => {
                const ingredient = ingredients.find((item) => item.value === ingredientItem);
                return ingredient ? acc + ingredient.price : acc;
            }, 0);
        },

        ingredientsCounter (state) {
            return state.ingredients.reduce((result, nextIngredient) => {
                if (result[nextIngredient]) {
                    result[nextIngredient] = result[nextIngredient] + 1; 
                    return result;
                } 
                result[nextIngredient] = 1

                return result;
            }, {});
        },

        totalPrice: state => {
            return (state.activeDough.price + state.activeSauce.price + state.ingredientPrice) * state.activeSize.multiplier;
        },

        isReadyToOrder (state) {
            if (state.ingredients.length >= 3 && state.name) {
                return true;
            }
            return false;
        },

        pizza (state) {
            return {
                index: uniqid(),
                name: state.name,
                dough: this.activeDough,
                sauce: this.activeSauce,
                size: this.activeSize,
                ingredientts: state.ingredients,
                price: this.totalPrice,     
            }
        },
    },
});
