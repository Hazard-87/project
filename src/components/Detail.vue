<template>
  <div>
    <div class="container">
      <Table :orders="details" :stage="order.stage" title="Detail" @onClick="setPause" />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

const WORK = "WORK";
const READY = "READY";
const PAUSE = "PAUSE";
const FINISH = "FINISH";

export default {
  name: "Detail",

  components: {
    Table,
  },

  props: ["details", "id", "order"],

  data() {
    return {
      time: 5000,
      // orders: [],
      // worked: [],
      // finish: [],
      // detailsData: {
      //   id: 1,
      //   name: "Detail",
      //   listID: 1,
      //   status: READY,
      //   stage: 1,
      // },
    };
  },

  methods: {
    setPause(index) {
      if (this.orders[index].status === READY) {
        this.orders[index].status = PAUSE;
      } else {
        this.orders[index].status = READY;
      }
    },

    setWorked() {
      let isReady = this.details.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          // if (this.orders.length) {
          let el = { ...this.details.pop() };
          el.status = WORK;
          // el.id = this.orders.length;
          // this.worked.push(el);
          this.details.unshift(el);

          setTimeout(() => {
            // let obj = { ...this.worked.shift() };
            let obj = { ...this.details.shift() };
            obj.status = FINISH;
            // this.finish.unshift(obj);
            this.details.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
          // } else {
          // this.getNextStep();
          // }
        }, 500);
      }
    },

    getNextStep() {
      // const itemOrders = this.orders.find((item) => item.moduleID === this.id);
      // const itemWorked = this.worked.find((item) => item.moduleID === this.id);
      // if (!itemOrders && !itemWorked) {
      let isFinished = this.details.find(
        (item) =>
          item.moduleID === this.id &&
          (item.status === READY || item.status === WORK)
      );
      if (!isFinished) {
        console.log("Step 1 finished");
        this.$emit("onDetailCompleted", this.id);
        this.$emit("onSetStage", this.order.id);
      }
    },
  },

  created() {
    // let details = new Array(5).fill(this.data).map((order, index) => {
    //   return {
    //     id: index + 1,
    //     name: order.name,
    //     listID: order.listID,
    //     status: order.status,
    //     stage: order.stage,
    //   };
    // });
    // this.orders = orders;
    this.setWorked();
    console.log("Step 1 started");
  },
};
</script>

<style>
.container {
  display: flex;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;
}
</style>