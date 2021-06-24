<template>
  <div id="app">
    <div class='container'>
      <Order />
      <SubOrder />
      <Module />
      <Detail />
    </div>
  </div>
</template>

<script>
import Order from "./components/Order.vue";
import SubOrder from "./components/SubOrder.vue";
import Module from "./components/Module.vue";
import Detail from "./components/Detail.vue";

import { mapActions } from "vuex";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "App",
  components: {
    Order,
    SubOrder,
    Module,
    Detail,
  },

  data() {
    return {
      id: 1,
      time: 30000,
      orderData: {
        id: 1,
        name: "Order",
        status: WAIT,
        stage: 1,
      },
      suborderData: {
        id: 1,
        name: "Suborder",
        orderID: 1,
        status: WAIT,
      },
      moduleData: {
        id: 1,
        name: "Module",
        suborderID: 1,
        status: WAIT,
      },
      detailData: {
        id: 1,
        name: "Detail",
        moduleID: 1,
        status: READY,
      },
    };
  },

  methods: {
    ...mapActions([
      "ordersAction",
      "subordersAction",
      "modulesAction",
      "detailsAction",
    ]),
  },

  created() {
    let details = new Array(5).fill(this.detailData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        moduleID: order.moduleID,
        status: order.status,
      };
    });

    let modules = new Array(1).fill(this.moduleData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        suborderID: order.suborderID,
        status: order.status,
      };
    });

    let suborders = new Array(1).fill(this.suborderData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        orderID: order.orderID,
        status: order.status,
      };
    });

    let orders = new Array(1).fill(this.orderData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        status: order.status,
        stage: order.stage,
      };
    });

    this.ordersAction(orders);
    this.subordersAction(suborders);
    this.modulesAction(modules);
    this.detailsAction(details);
  },
};
</script>

<style>
.container {
display: grid;
}
</style>
