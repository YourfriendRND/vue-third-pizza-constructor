import { HttpStatusCode } from 'axios';
import AxiosProvider from './AxiosProvider';
import { useAuthStore } from '../../store/auth';


const httpProvider = new AxiosProvider();
httpProvider.addInterceptor({
    onError: async (status) => {
        if (status === HttpStatusCode.Unauthorized) {
            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                return await authStore.logout()
            }
        }
    }
})

export default httpProvider;
