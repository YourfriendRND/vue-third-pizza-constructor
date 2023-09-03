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
            if (state.currentAddressId <= 0) {
                return '';
            }

            const targetAddress = state.addresses.find((address) => address.id === state.currentAddressId);
            
            if (targetAddress) {
                return targetAddress.name;
            }

            return '';
        },

        userPhone (state) {
            return state.user.phone
        },

        street (state) {
            if (state.currentAddressId <= 0) {
                return '';
            }

            const targetAddress = state.addresses.find((address) => address.id === state.currentAddressId);
           
            if (targetAddress) {
                return targetAddress.street;
            }

            return '';
        },

        flat (state) {
            if (state.currentAddressId <= 0) {
                return '';
            }

            const targetAddress = state.addresses.find((address) => address.id === state.currentAddressId);
            
            if (targetAddress) {
                return targetAddress.flat;
            }

            return '';
        },

        building (state) {
            if (state.currentAddressId <= 0) {
                return '';
            }

            const targetAddress = state.addresses.find((address) => address.id === state.currentAddressId);
            
            if (targetAddress) {
                return targetAddress.building;
            }
            
            return '';
        },

        nextAddressId (state) {
            return state.addresses.length + 1;
        },

    },
    actions: {
        setAddressId (id) {
            this.currentAddressId = id;
        },

        addNewAddress (address) {
            this.addresses.push({
                id: this.addresses.length + 1,
                name: "Без названия",
                street: address.street,
                building: address.building,
                flat: address.flat ? address.flat : "",
                comment: "",
                userId: this.user.id
            });
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

        closeDeleteModal() {
            this.isDeleteModalShow = false;
        },

        resetEditableForm () {
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
            this.closeDeleteModal()
        },

        deleteAddress () {
            this.addresses = this.addresses.filter((address) => address.id !== this.editableAddress.id);
            this.resetEditableForm();
        }
    },
});
