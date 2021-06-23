<template>
  <div>
    <div class="container">
      <Table :orders="suborders" :stage="order.stage" title="SubOrder" />
    </div>
    <div>
      <Module
        v-for="suborder in suborders"
        :key="suborder.id"
        :modules="suborder.modules"
        :id="suborder.id"
        :order="order"
        @onModuleCompleted="onModuleCompleted"
        @onSetStage="setStage"
      />
    </div>
  </div>
</template>

<script>
import Module from "@/components/Module.vue";
import Table from "@/components/Table.vue";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "SubOrder",
  components: {
    Module,
    Table,
  },

  props: ["suborders", "id", "order"],

  data() {
    return {
      time: 15000,
      intervalID: 0,
      isModuleCompleted: false,
      orders: [],
      worked: [],
      finish: [],
      suborderData: {
        id: 1,
        name: "Suborder",
        listID: 1,
        status: WAIT,
        stage: 1,
      },
    };
  },

  methods: {
    onModuleCompleted(id) {
      let obj = this.suborders.find((item) => {
        if (item.id === id) {
          item.status = READY;
          return 1;
        }
      });
      if (obj) {
        this.setWorked();
        console.log("Step 3 started");
      }
    },

    setWorked() {
      let isReady = this.suborders.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.suborders.pop() };
          el.status = WORK;
          this.suborders.unshift(el);

          setTimeout(() => {
            let obj = { ...this.suborders.shift() };
            obj.status = FINISH;
            this.suborders.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      const isFinished = this.suborders.find(
        (item) =>
          item.orderID === this.id &&
          (item.status === READY || item.status === WORK)
      );
      if (!isFinished) {
        console.log("Step 3 finished");
        this.$emit("onSubOrderCompleted", this.id);
        this.$emit("onSetStage", this.order.id);
      }
    },

    setStage(id) {
      this.$emit("onSetStage", id);
    },
  },

  created() {
    // let suborders = new Array(10).fill(this.data).map((order, index) => {
    //   return {
    //     id: index + 1,
    //     name: order.name,
    //     listID: order.listID,
    //     status: order.status,
    //     stage: order.stage,
    //   };
    // });
    // this.orders = orders;
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