<template>
  <div>
    <div class="container">
      <Table :orders="module.details" :stage="order.stage" title="Detail" @onClick="setPause" />
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

  props: ["order", "module"],

  data() {
    return {
      time: 5000,
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
      let isReady = this.module.details.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.module.details.pop() };
          el.status = WORK;
          this.module.details.unshift(el);

          setTimeout(() => {
            let obj = { ...this.module.details.shift() };
            obj.status = FINISH;
            this.module.details.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      let isFinished = this.module.details.find(
        (item) =>
          item.moduleID === this.module.id &&
          (item.status === READY || item.status === WORK)
      );
      if (!isFinished) {
        console.log("Step 1 finished");
        this.$emit("onDetailCompleted", this.module.id);
        this.$emit("onSetStage", this.order.id);
      }
    },
  },

  created() {
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