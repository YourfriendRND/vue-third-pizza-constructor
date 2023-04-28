import uniqid from 'uniqid';
import { defineStore } from 'pinia';
import addresses from '@/mocks/address';
import user from '@/mocks/user';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: user,
        addresses: addresses,
        currentAddressId: 0,
        editableAddress: {
            id: 0,
            name: "",
            street: "",
            building: "",
            flat: "",
            comment: "",
        },
    }),
    
    getters: {
        street (state) {
            if (!state.currentAddressId) {
                return '';
            }
            const targetAddress = state.addresses.find((address) => address.id === Number(state.currentAddressId));
            if (targetAddress) {
                return targetAddress.street;
            }
            return '';
        },
        flat (state) {
            if (!state.currentAddressId) {
                return '';
            }
            const targetAddress = state.addresses.find((address) => address.id === Number(state.currentAddressId));
            if (targetAddress) {
                return targetAddress.flat;
            }
            return '';
        },
        building (state) {
            if (!state.currentAddressId) {
                return '';
            }
            const targetAddress = state.addresses.find((address) => address.id === Number(state.currentAddressId));
            if (targetAddress) {
                return targetAddress.building;
            }
            return '';
        }

    },
    actions: {
        setAddressId (id) {
            this.currentAddressId = id;
        },

        setAddressAsEditable (address) {
            if (!address) {
                this.editableAddress = {
                    id: 0,
                    name: "",
                    street: "",
                    building: "",
                    flat: "",
                    comment: "",
                }
                return;
            }
            this.editableAddress = {
                id: address.id,
                name: address.name,
                street: address.street,
                building: address.building,
                flat: address.flat,
                comment: address.comment,
            }
        },

        setEditableField (value, field) {
            this.editableAddress[field] = value;
        },

        setNewAddress () {
            this.addresses = this.editableAddress.id 
                ? this.addresses.map((address) => {
                    if (address.id === this.editableAddress.id) {
                        return {
                            ...address,
                            ...this.editableAddress,
                        }
                    }
                    return address;
                })
                : [...this.addresses, {
                    ...this.editableAddress,
                    id: uniqid(),
                    userId: this.user.id
                }]
            this.editableAddress = {
                id: 0,
                name: "",
                street: "",
                building: "",
                flat: "",
                comment: "",
            }
        }
    },
});
