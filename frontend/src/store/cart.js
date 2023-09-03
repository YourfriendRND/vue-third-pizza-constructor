import { defineStore } from "pinia";
import { useDataStore } from "@/store/data";
import { useProfileStore } from "@/store/profile";
import { DeliveryTypes } from "@/common/constants";
const dataStore = useDataStore(); 
const profileStore = useProfileStore();

export const useCartStore = defineStore('cart', {
    state: () =>  ({
      deliveryType: DeliveryTypes.Self,
      phone: profileStore.userPhone,
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
      initStore () {
        this.deliveryType = DeliveryTypes.Self;
        this.phone = profileStore.userPhone;
        this.address = {
            street: "",
            building: "",
            flat: "",
            comment: "",
          };
        this.pizzas = [];
        this.misc = dataStore.misc.map((misc) => ({...misc, count: 0}));
      },

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
      },

      repeateOrder ({ deliveryType, addressId, pizzas, misc }) {
        this.setPhone('');
        this.setDeliveryType(deliveryType);
        const address = profileStore.addresses.find((address) => address.id === addressId);
        this.address = {
          building: address && address.building ? address.building : '',
          flat: address && address.flat ? address.flat : '',
          street: address && address.street ? address.street : '',
          comment: address && address.comment ? address.comment : '',
        }
        this.pizzas = [...pizzas];
        this.misc = [...misc];
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
        const clearNumber = state.phone.split('').filter((item) => new RegExp(/\d/).test(item)).slice(1).join('');
        return new RegExp(/^((|7|8)+([0-9]){10})$/).test(clearNumber);
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
