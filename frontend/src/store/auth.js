import { defineStore } from 'pinia';
import authService from '../services/auth-service';
import { removeToken, saveToken } from '../services/token-manager';

export const useAuthStore = defineStore('suth', {
    state: () => ({
        user: null,
    }),

    getters: {
        isAuthenticated: state => Boolean(state.user),
    },

    actions: {
        async logout(sendRequest = true) {
            this.user = null;
            await authService.logout();
            removeToken();
        },

        async getMe() {
            this.user = await authService.whoAmI();
        },

        async login(email, password) {
            try {
                const user = await authService.login(email, password)
                saveToken(user.tokken);
                return 'user has been login';
            } catch (err) {
                throw Error(err);
            }
        }
    }
})

