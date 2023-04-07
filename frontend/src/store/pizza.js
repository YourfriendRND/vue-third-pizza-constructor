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
        }
    },
    getters: {

        getActiveSauce: state => {
            const [defaultSauce] = dataStore.sauces;
            const targetSauce = dataStore.sauces.find((sauce) => state.sauceId === sauce.id);
            return targetSauce ? targetSauce : defaultSauce;  
        },
        getActiveDough: state => {
            const [defaultDoughType] = dataStore.dough;
            const targetDough = dataStore.dough.find((dough) => state.doughId === dough.id);
            return targetDough ? targetDough : defaultDoughType;
        },
        size: state => {
            const [defaultSize] = dataStore.sizes;
            const targetSize = dataStore.sizes.find((size) => state.sizeId === size.id);
            return targetSize ? targetSize : defaultSize;
        },

        ingredientsPrice: state => {
            const ingredients = dataStore.ingredients;
            return state.ingredients.reduce((acc, ingredientName) => {
                const ingredient = ingredients.find((item) => item.value === ingredientName);
                return ingredient ? acc + ingredient.price : acc;
            }, 0) 
        },
        price: state => {
            // const ingredientsPrice = pizza.ingredientCounter.ingredients.reduce((prev, next) =>{
            //   const targetIngredient = dataStore.ingredients.find((item) => item.value === next);
            //   const ingredientItemPrice = targetIngredient ? targetIngredient.price : 0;
            //   return prev + ingredientItemPrice;
            // }, 0)
          
            return (state.getActiveDough.price + state.getActiveSauce.price + state.ingredientsPrice) * state.size.multiplier;
        }
    },
});
