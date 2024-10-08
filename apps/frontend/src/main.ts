import './styles.scss';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import router from './router';
import './assets/tailwind.css';

import { createApp } from 'vue';
import App from './app/App.vue';
import store from './store';

const vuetify = createVuetify();
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);

app.mount('#root');
