<template>
  <div id="app">
    <div class="table">
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
import RowHeader from "./components/RowHeader.vue";

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
    RowHeader,
  },

  data() {
    return {
      id: 1,
      time: 30000,
      orders: [
        {
          id: 1,
          name: "Order 1",
          status: WAIT,
          stage: 1,
        },
        {
          id: 2,
          name: "Order 2",
          status: WAIT,
          stage: 1,
        },
      ],
      suborders: [
        {
          id: 1,
          name: "Suborder 1",
          orderID: 1,
          status: WAIT,
          stage: 1,
        },
        {
          id: 2,
          name: "Suborder 2",
          orderID: 1,
          status: WAIT,
          stage: 1,
        },
        {
          id: 3,
          name: "Suborder 3",
          orderID: 2,
          status: WAIT,
          stage: 1,
        },
        {
          id: 4,
          name: "Suborder 4",
          orderID: 2,
          status: WAIT,
          stage: 1,
        },
      ],
      modules: [
        {
          id: 1,
          name: "Module 1",
          suborderID: 1,
          status: WAIT,
          stage: 1,
        },
        {
          id: 2,
          name: "Module 2",
          suborderID: 1,
          status: WAIT,
          stage: 1,
        },
        {
          id: 3,
          name: "Module 3",
          suborderID: 2,
          status: WAIT,
          stage: 1,
        },
        {
          id: 4,
          name: "Module 4",
          suborderID: 2,
          status: WAIT,
          stage: 1,
        },
        {
          id: 5,
          name: "Module 5",
          suborderID: 3,
          status: WAIT,
          stage: 1,
        },
        {
          id: 6,
          name: "Module 6",
          suborderID: 3,
          status: WAIT,
          stage: 1,
        },
        {
          id: 7,
          name: "Module 7",
          suborderID: 4,
          status: WAIT,
          stage: 1,
        },
        {
          id: 8,
          name: "Module 8",
          suborderID: 4,
          status: WAIT,
          stage: 1,
        },
      ],
      details: [
        {
          id: 1,
          name: "Detail 1",
          moduleID: 1,
          status: READY,
          stage: 1,
        },
        {
          id: 2,
          name: "Detail 2",
          moduleID: 1,
          status: READY,
          stage: 1,
        },
        {
          id: 3,
          name: "Detail 3",
          moduleID: 2,
          status: READY,
          stage: 1,
        },
        {
          id: 4,
          name: "Detail 4",
          moduleID: 2,
          status: READY,
          stage: 1,
        },
        {
          id: 5,
          name: "Detail 5",
          moduleID: 3,
          status: READY,
          stage: 1,
        },
        {
          id: 6,
          name: "Detail 6",
          moduleID: 3,
          status: READY,
          stage: 1,
        },
        {
          id: 7,
          name: "Detail 7",
          moduleID: 4,
          status: READY,
          stage: 1,
        },
        {
          id: 8,
          name: "Detail 8",
          moduleID: 4,
          status: READY,
          stage: 1,
        },
        {
          id: 9,
          name: "Detail 9",
          moduleID: 5,
          status: READY,
          stage: 1,
        },
        {
          id: 10,
          name: "Detail 10",
          moduleID: 5,
          status: READY,
          stage: 1,
        },
        {
          id: 11,
          name: "Detail 11",
          moduleID: 6,
          status: READY,
          stage: 1,
        },
        {
          id: 12,
          name: "Detail 12",
          moduleID: 6,
          status: READY,
          stage: 1,
        },
        {
          id: 13,
          name: "Detail 13",
          moduleID: 7,
          status: READY,
          stage: 1,
        },
        {
          id: 14,
          name: "Detail 14",
          moduleID: 7,
          status: READY,
          stage: 1,
        },
        {
          id: 15,
          name: "Detail 15",
          moduleID: 8,
          status: READY,
          stage: 1,
        },
        {
          id: 16,
          name: "Detail 16",
          moduleID: 8,
          status: READY,
          stage: 1,
        },
      ],
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
        stage: 1,
      },
      moduleData: {
        id: 1,
        name: "Module",
        suborderID: 1,
        status: WAIT,
        stage: 1,
      },
      detailData: {
        id: 1,
        name: "Detail",
        moduleID: 1,
        status: READY,
        stage: 1,
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
        stage: order.stage,
      };
    });

    let modules = new Array(1).fill(this.moduleData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        suborderID: order.suborderID,
        status: order.status,
        stage: order.stage,
      };
    });

    let suborders = new Array(1).fill(this.suborderData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        orderID: order.orderID,
        status: order.status,
        stage: order.stage,
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

    this.ordersAction(this.orders);
    this.subordersAction(this.suborders);
    this.modulesAction(this.modules);
    this.detailsAction(this.details);
  },
};
</script>

<style>
.table {
  width: 98vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 50%;
  margin-bottom: 10px;
}
.box-top {
  display: flex;
  justify-content: space-between;
}
</style>
