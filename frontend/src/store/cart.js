import { defineStore } from "pinia";
import { useDataStore } from "@/store/data";
import { DeliveryTypes } from "@/common/constants";
const dataStore = useDataStore(); 

export const useCartStore = defineStore('cart', {
    state: () => ({
        deliveryType: DeliveryTypes.New,
        phone: "",
        address: {
          street: "",
          building: "",
          flat: "",
          comment: "",
        },
        pizzas: [],
        misc: dataStore.misc.map((misc) => ({...misc, count: 0})),
    }),
    actions: {
      addPizza (pizza) {
        this.pizzas = [...this.pizzas, { ...pizza, count: 1 }];
      },
      updatePizza (updatedPizza) {
        this.pizzas = this.pizzas.map((pizza) => {
          if (pizza.index === updatedPizza.index) {
            return {
              ...pizza,
              count: updatedPizza.count,
            }
          }
          return pizza;
        })
      },
      updateMisc (updatedMisc) {
        this.misc = this.misc.map((misc) => {
          if (misc.name === updatedMisc.name) {
            return {
              ...misc,
              count: updatedMisc.count,
            }
          }
          return misc;
        })
      },
      setDeliveryType (type) {
        this.deliveryType = type;
      }
    },
    getters: {
      orderPrice (state) {
        const pizzasPrice = state.pizzas.reduce((acc, pizza) => {
          acc = acc + (pizza.count * pizza.price);
          return acc;
        }, 0);
        const miscPrice = state.misc.reduce((acc, misc) => {
          acc = acc + (misc.count * misc.price);
          return acc;
        }, 0);
        return miscPrice + pizzasPrice;
      },
    },
});
