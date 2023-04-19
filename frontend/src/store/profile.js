import { defineStore } from "pinia";
import addresses from '@/mocks/address';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        addresses: addresses,
        currentAddressId: 0,
    }),
    getters: {
        street (state) {
            if (!state.currentAddressId) {
                return "";
            }
            const targetAddress = state.addresses.find((address) => address.id === Number(state.currentAddressId));
            if (targetAddress) {
                return targetAddress.street;
            }
            return "";
        },
        flat (state) {
            if (!state.currentAddressId) {
                return "";
            }
            const targetAddress = state.addresses.find((address) => address.id === Number(state.currentAddressId));
            if (targetAddress) {
                return targetAddress.flat;
            }
            return "";
        },
        building (state) {
            if (!state.currentAddressId) {
                return "";
            }
            const targetAddress = state.addresses.find((address) => address.id === Number(state.currentAddressId));
            if (targetAddress) {
                return targetAddress.building;
            }
            return "";
        }

    },
    actions: {
        setAddressId (id) {
            this.currentAddressId = id;
        }
    },
});
