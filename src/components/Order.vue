<template>
  <div>
    <div class="container">
      <Table :orders="orders" title="Order" />
    </div>
    <div>
      <SubOrder
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @onSubOrderCompleted="onSubOrderCompleted"
        @onSetStage="setStage"
      />
    </div>
  </div>
</template>

<script>
import SubOrder from "@/components/SubOrder.vue";
import Table from "@/components/Table.vue";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "Order",
  components: {
    SubOrder,
    Table,
  },

  props: ["id"],

  data() {
    return {
      time: 30000,
      intervalID: 0,
      isSubOrderCompleted: false,
      orders: [],
      worked: [],
      finish: [],
      orderData: {
        id: 1,
        name: "Order",
        status: WAIT,
        stage: 1,
        suborders: [],
      },
      suborderData: {
        id: 1,
        name: "Suborder",
        orderID: 1,
        status: WAIT,
        modules: [],
      },
      moduleData: {
        id: 1,
        name: "Module",
        suborderID: 1,
        status: WAIT,
        details: [],
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
    onSubOrderCompleted(id) {
      let obj = this.orders.find((item) => {
        if (item.id === id) {
          item.status = READY;
          return 1;
        }
      });
      if (obj) {
        this.setWorked();
        console.log("Step 4 started");
      }
    },

    setWorked() {
      let isReady = this.orders.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.orders.pop() };
          el.status = WORK;

          this.orders.unshift(el);

          setTimeout(() => {
            let obj = { ...this.orders.shift() };
            obj.status = FINISH;
            this.orders.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      const isFinished = this.orders.find(
        (item) => item.status === READY || item.status === WORK
      );
      if (!isFinished) {
        console.log("Step 4 finished");
        this.setSuccess();
      }
    },

    setStage(id) {
      this.orders.find((order) => {
        if (order.id === id) {
          order.stage++;
        }
      });
    },

    setSuccess() {
      this.orders.find((order) => {
        if (order.status === FINISH) {
          order.stage = "SUCCESS";
        }
      });
    },
  },

  created() {
    let details = new Array(2).fill(this.detailData).map((order, index) => {
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
        details,
      };
    });

    let suborders = new Array(1).fill(this.suborderData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        orderID: order.orderID,
        status: order.status,
        modules,
      };
    });

    let orders = new Array(1).fill(this.orderData).map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        status: order.status,
        stage: order.stage,
        suborders,
      };
    });
    this.orders = orders;
  },
};
</script>

<style>
.container {
  display: flex;
}
.work {
  width: 600px;
  margin-right: 100px;
}
.worked {
  width: 600px;
  margin-right: 100px;
}
.finish {
  width: 600px;
}
</style>