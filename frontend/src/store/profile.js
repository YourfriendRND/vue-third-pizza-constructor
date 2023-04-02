import { defineStore } from "pinia";
import addresses from '@/mocks/address';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        addresses: addresses,
    }),
    getters: {},
    actions: {},
});
