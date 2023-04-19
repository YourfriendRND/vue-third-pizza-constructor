import { defineStore } from "pinia";
import { useDataStore } from "@/store/data";
import { DeliveryTypes } from "@/common/constants";
const dataStore = useDataStore(); 

export const useCartStore = defineStore('cart', {
    state: () => ({
        deliveryType: DeliveryTypes.Self,
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
        const isExistPizzaIndex = this.pizzas.findIndex((existPizza) => existPizza.index === pizza.index);
        if (isExistPizzaIndex === -1) {
          this.pizzas = [...this.pizzas, { ...pizza, count: 1 }];
        } else {
          this.pizzas = [...this.pizzas.slice(0, isExistPizzaIndex), {...pizza, count: this.pizzas[isExistPizzaIndex].count}, ...this.pizzas.slice(isExistPizzaIndex + 1)]
        }
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
      },
      setPhone (phone) {
        this.phone = phone;
      },
      setStreet (street) {
        this.address.street = street;
      },
      setBuilding (building) {
        this.address.building = building;
      },
      setFlat (flat) {
        this.address.flat = flat;
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
      isPhoneNumberCorrect (state) {
        return new RegExp(/^((\+7|7|8)+([0-9]){10})$/).test(state.phone);
      },

      isOrderAvailabale (state) {
        if (state.deliveryType === DeliveryTypes.Self && this.isPhoneNumberCorrect) {
          return true;
        }
        if (state.isPhoneNumberCorrect && state.address.building && state.address.street) {
          return true;
        }
        return false;
      }
    },
});
