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
    2. Страница профиля
    2.1. Вывод данных профиля
    2.2. Оживить форму редактирования адреса
    2.3. Сделать форму добавления адреса
    2.4. Удалять ранее сохраненный адрес

    3. Страница истории заказов
    3.1. Добавить вывод ранее сделанных заказов
    3.2. Удалять заказ из истории
    3.3. Повторять заказ отправив его в корзину

 */