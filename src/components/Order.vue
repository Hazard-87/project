<template>
  <div>
     <RowItem v-for="order in Orders" :key="order.id" :list="order" />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import { mapGetters } from 'vuex';

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "Order",
  components: {
   RowItem
  },

  data() {
    return {
      time: 30000,
      // intervalID: 0,
      // isSubOrderCompleted: false,
      // orders: [],
      // worked: [],
      // finish: [],
      // orderData: {
      //   id: 1,
      //   name: "Order",
      //   status: WAIT,
      //   stage: 1,
      //   suborders: [],
      // },
      // suborderData: {
      //   id: 1,
      //   name: "Suborder",
      //   orderID: 1,
      //   status: WAIT,
      //   modules: [],
      // },
      // moduleData: {
      //   id: 1,
      //   name: "Module",
      //   suborderID: 1,
      //   status: WAIT,
      //   details: [],
      // },
      // detailData: {
      //   id: 1,
      //   name: "Detail",
      //   moduleID: 1,
      //   status: READY,
      // },
    };
  },

  methods: {
  //   onSubOrderCompleted(id) {
  //     let obj = this.orders.find((item) => {
  //       if (item.id === id) {
  //         item.status = READY;
  //         return 1;
  //       }
  //     });
  //     if (obj) {
  //       this.setWorked();
  //       console.log("Step 4 started");
  //     }
  //   },

    setWorked() {
      let isReady = this.Orders.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.Orders.pop() };
          el.status = WORK;

          this.Orders.unshift(el);

          setTimeout(() => {
            let obj = { ...this.Orders.shift() };
            obj.status = FINISH;
            this.Orders.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      // const isFinished = this.orders.find(
      //   (item) => item.status === READY || item.status === WORK
      // );
      // if (!isFinished) {
        console.log("Step 4 finished");
        // this.setSuccess();
      // }
    },

  //   setStage(id) {
  //     this.orders.find((order) => {
  //       if (order.id === id) {
  //         order.stage++;
  //       }
  //     });
  //   },

  //   setSuccess() {
  //     this.orders.find((order) => {
  //       if (order.status === FINISH) {
  //         order.stage = "SUCCESS";
  //       }
  //     });
  //   },
  },

  computed: {
    ...mapGetters(['Orders']),
  
  changeSuborderCompleted() {
      this.setWorked();
      console.log("Step 4 started");
      return this.Orders;
    },
  },

  watch: {
    changeSuborderCompleted() {}
  }

  // created() {
  //   let details = new Array(5).fill(this.detailData).map((order, index) => {
  //     return {
  //       id: index + 1,
  //       name: order.name,
  //       moduleID: order.moduleID,
  //       status: order.status,
  //     };
  //   });

  //   let modules = new Array(1).fill(this.moduleData).map((order, index) => {
  //     return {
  //       id: index + 1,
  //       name: order.name,
  //       suborderID: order.suborderID,
  //       status: order.status,
  //       details
  //     };
  //   });

  //   let suborders = new Array(1).fill(this.suborderData).map((order, index) => {
  //     return {
  //       id: index + 1,
  //       name: order.name,
  //       orderID: order.orderID,
  //       status: order.status,
  //       modules
  //     };
  //   });

  //   let orders = new Array(1).fill(this.orderData).map((order, index) => {
  //     return {
  //       id: index + 1,
  //       name: order.name,
  //       status: order.status,
  //       stage: order.stage,
  //       suborders
  //     };
  //   });
  //   this.orders = orders;
  // },
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