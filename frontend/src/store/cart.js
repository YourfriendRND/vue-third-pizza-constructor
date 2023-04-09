import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        phone: "",
        address: {
          street: "",
          building: "",
          flat: "",
          comment: "",
        },
        pizzas: [],
        misc: [],
    }),
    actions: {
      addPizza (pizza) {
        this.pizzas = [...this.pizzas, pizza];
      }
    },
    getters: {},
});
