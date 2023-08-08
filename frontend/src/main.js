import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

/**
 * 
    
    ** Переделать модалку авторизации под модалку подтверждения удаления адреса.

    3. Страница истории заказов
    3.1. Добавить вывод ранее сделанных заказов
    3.2. Удалять заказ из истории
    3.3. Повторять заказ отправив его в корзину

 */