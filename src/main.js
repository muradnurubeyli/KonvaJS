import Vue from "vue";
import App from "./App.vue";
import { Form, InputNumber } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VueKonva from "vue-konva";
Vue.use(VueKonva);
Vue.use(Form);
Vue.component("FormItem", Form.Item);
Vue.component("InputNumber", InputNumber);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
