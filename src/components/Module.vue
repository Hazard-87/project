<template>
  <div>
    <Form @addTask="addTask" />
    <div class="container">
      <Table :orders="suborder.modules" :stage="order.stage" title="Module" />
    </div>
    <div>
      <Detail
        v-for="module in suborder.modules"
        :key="module.id"
        :module="module"
        :order="order"
        @onDetailCompleted="onDetailCompleted"
        @onSetStage="setStage"
      />
    </div>
  </div>
</template>

<script>
import Detail from "@/components/Detail.vue";
import Table from "@/components/Table.vue";
import Form from "@/components/Form.vue";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "Module",
  components: {
    Detail,
    Table,
    Form
  },

  props: ["order", "suborder"],

  data() {
    return {
      time: 10000,
    };
  },

  methods: {
    addTask(payload) {
      this.suborder.modules.push({
        id: Date.now(),
        name: payload.name,
        suborderID: payload.listID,
        status: READY,
      });
    },

    onDetailCompleted(id) {
      let obj = this.suborder.modules.find((item) => {
        if (item.id === id) {
          item.status = READY;
          return 1;
        }
      });
      if (obj) {
        this.setWorked();
        console.log("Step 2 started");
      }
    },

    setWorked() {
      let isReady = this.suborder.modules.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.suborder.modules.pop() };
          el.status = WORK;
          this.suborder.modules.unshift(el);

          setTimeout(() => {
            let obj = { ...this.suborder.modules.shift() };
            obj.status = FINISH;
            this.suborder.modules.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      let isNextStep = true;

      this.suborder.modules.forEach((item) => {
        if (item.suborderID == this.suborder.id) {
          if (item.status === READY || item.status === WORK) {
            isNextStep = false;
          }
        }
      });
      if (isNextStep) {
        console.log("Step 2 finished");
        this.$emit("onModuleCompleted", this.suborder.id);
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