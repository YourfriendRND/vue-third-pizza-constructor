import uniqid from 'uniqid';
import { defineStore } from 'pinia';
import addresses from '@/mocks/address';
import user from '@/mocks/user';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: user,
        addresses: addresses,
        currentAddressId: "",
        editableAddress: {
            id: "",
            name: "",
            street: "",
            building: "",
            flat: "",
            comment: "",
        },
        isAddressFormOpen: false,
        isDeleteModalShow: false,
    }),
    
    getters: {
        addressName (state) {
            if (!state.currentAddressId) {
                return '';
            }
            const targetAddress = state.addresses.find((address) => address.id === state.currentAddressId);
            if (targetAddress) {
                return targetAddress.name;
            }
            return '';
        },

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
            this.isAddressFormOpen = address && address.id === this.currentAddressId ? false : true
            if (!address || !this.isAddressFormOpen) {
                this.currentAddressId = "";
                this.editableAddress = {
                    id: "",
                    name: "",
                    street: "",
                    building: "",
                    flat: "",
                    comment: "",
                }
                return;
            }
            if (address && this.isAddressFormOpen) {
                this.currentAddressId = address.id;
                this.editableAddress = {
                    id: address.id,
                    name: address.name,
                    street: address.street,
                    building: address.building,
                    flat: address.flat,
                    comment: address.comment,
                }
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
            this.isAddressFormOpen = false;
            this.currentAddressId = "";
            this.editableAddress = {
                id: "",
                name: "",
                street: "",
                building: "",
                flat: "",
                comment: "",
            }
        },

        deleteAddress (addressId) {
            if (addressId) {
                this.addresses = this.addresses.filter((address) => address.id !== addressId);
            }
            this.isAddressFormOpen = false;
            this.currentAddressId = "";
            this.editableAddress = {
                id: "",
                name: "",
                street: "",
                building: "",
                flat: "",
                comment: "",
            }

        }
    },
});
