<template>
  <div>
    <div class="container">
      <Table :orders="order.suborders" :stage="order.stage" title="SubOrder" />
    </div>
    <div>
      <Module
        v-for="suborder in order.suborders"
        :key="suborder.id"
        :suborder="suborder"
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

  props: ["order"],

  data() {
    return {
      time: 15000,
    };
  },

  methods: {
    onModuleCompleted(id) {
      let obj = this.order.suborders.find((item) => {
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
      let isReady = this.order.suborders.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.order.suborders.pop() };
          el.status = WORK;
          this.order.suborders.unshift(el);

          setTimeout(() => {
            let obj = { ...this.order.suborders.shift() };
            obj.status = FINISH;
            this.order.suborders.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      let isNextStep = true;

      this.order.suborders.forEach((item) => {
        if (item.orderID == this.order.id) {
          if (item.status === READY || item.status === WORK) {
            isNextStep = false;
          }
        }
      });
      if (isNextStep) {
        console.log("Step 3 finished");
        this.$emit("onSubOrderCompleted", this.order.id);
        this.$emit("onSetStage", this.order.id);
      }
    },

    setStage(id) {
      this.$emit("onSetStage", id);
    },
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